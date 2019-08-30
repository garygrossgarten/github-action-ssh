export const keyboardFunction = password => (
  name,
  instructions,
  instructionsLang,
  prompts,
  finish
) => {
  if (
    prompts.length > 0 &&
    prompts[0].prompt.toLowerCase().includes("password")
  ) {
    finish([password]);
  }
};
