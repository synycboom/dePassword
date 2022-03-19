const requireEnv = (name: string): string => {
  const env = process.env[name];
  if (!env) {
    throw new Error(`[requireEnv]: ${name} is not set`);
  }
  return env;
};

export default {
  CONTRACT_ADDRESS: requireEnv("REACT_APP_CONTRACT_ADDRESS"),
  SERVER_URL: requireEnv("REACT_APP_SERVER_URL"),
  SWARM_GATEWAY: requireEnv("REACT_APP_SWARM_GATEWAY"),
};
