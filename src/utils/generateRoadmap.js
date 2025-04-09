export const generateRoadmap = async (dreamJob, onStreamUpdate) => {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'deepseek/deepseek-chat:free',
      stream: true,
      messages: [
        {
          role: 'system',
          content: 'You are a career coach AI. Generate a step-by-step roadmap for a dream job.',
        },
        {
          role: 'user',
          content: `Give me a short and clean step-by-step career roadmap to become a ${dreamJob}. 
        Keep it concise, structured in 5-6 bullet points. Avoid long explanations. Focus on practical, realistic steps.`
        }
      ],
    }),
  });

  if (!response.ok || !response.body) {
    throw new Error('Failed to connect to OpenRouter.');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let partial = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    partial += chunk;

    const lines = partial.split('\n');

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed === '' || !trimmed.startsWith('data:')) continue;

      const jsonStr = trimmed.replace('data: ', '');
      if (jsonStr === '[DONE]') {
        return;
      }

      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) {
          // 👇 Clean bold markdown
          onStreamUpdate(content.replace(/\*\*/g, ''));
        }
      } catch (err) {
        console.error('Failed to parse JSON chunk:', jsonStr);
      }
    }

    // Keep the last line in case it was incomplete
    partial = lines[lines.length - 1];
  }
};
