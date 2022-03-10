function isStorybook() {
  return process.env.STORYBOOK && process.env.STORYBOOK === 'true';
}

function Toast(severity, message) {
  let event = new Event('toast');
  event.severity = severity;
  event.message = message;
  document.dispatchEvent(event);
}

export { isStorybook, Toast };
