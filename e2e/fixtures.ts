import { test as base, expect } from "@playwright/test";

type Credentials = {
  email: string;
  password: string;
  description: string;
};

const invalidCredentials: Credentials[] = [
  {
    email: "testUser@gmail.com",
    password: "test#123",
    description: "invalid email and password",
  },
  {
    email: "wrong@email.com",
    password: "wrongpass",
    description: "completely wrong credentials",
  },
  {
    email: "user@example.com",
    password: "123456",
    description: "weak password but valid format",
  },
];

export const loginTest = base.extend<{
  credential: Credentials;
}>({
  credential: async ({}, run, testInfo) => {
    const index =
      Number(
        testInfo.titlePath[testInfo.titlePath.length - 1].match(/\d+/)?.[0]
      ) || 0;
    await run(invalidCredentials[index % invalidCredentials.length]);
  },
});

export { expect, invalidCredentials };
