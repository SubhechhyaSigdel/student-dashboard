type WelcomeMessageProps = {
  name: string;
};

function WelcomeMessage({ name }: WelcomeMessageProps) {
  return (
    <div>
      <h1>Welcome, {name}!</h1>
    </div>
  );
}

export default WelcomeMessage;
