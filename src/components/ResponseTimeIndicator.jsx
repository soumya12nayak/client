import moment from 'moment';

const ResponseTimeIndicator = ({ appliedDate }) => {
  const daysSinceApplied = moment().diff(moment(appliedDate), 'days');

  return (
    <div className="mt-1 text-xs text-gray-500">
      {daysSinceApplied === 0 
        ? 'Applied Today' 
        : daysSinceApplied === 1 
        ? 'Applied Yesterday' 
        : `Applied ${daysSinceApplied} days ago`}
    </div>
  );
};

export default ResponseTimeIndicator;
