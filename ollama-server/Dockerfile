FROM ubuntu:20.04

# Install dependencies
RUN apt-get update && apt-get install -y \
    curl \
    && curl -fsSL https://ollama.com/install.sh | sh

# Expose the port Ollama uses
EXPOSE 11434

# Run Ollama
CMD ["ollama", "serve"]
