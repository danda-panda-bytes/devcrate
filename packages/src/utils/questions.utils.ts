import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

export async function askTerminal(question: string): Promise<string> {
  return new Promise(resolve => rl.question(question, resolve));
}
