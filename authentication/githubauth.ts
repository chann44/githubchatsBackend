import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
const secret = "sssss";
const router = Router();
import { get } from "lodash";
const GITHUB_CLIENT_ID = "5caf3cf55e98184c29f8";
const GITHUB_CLIENT_SECRET = "8bbaa1c441083315f4bb5d2ff58d4f6f0c423699";
import axios from "axios";
import querystring from "querystring";

const COOKIE_NAME = "github-jwt";

export interface GitHubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: null;
  blog: string;
  location: string;
  email: null;
  hireable: null;
  bio: null;
  twitter_username: null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: Date;
  updated_at: Date;
}

async function getGitHubUser({ code }: { code: string }): Promise<GitHubUser> {
  const githubToken = await axios
    .post(
      `https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${code}`
    )
    .then((res) => res.data)

    .catch((error) => {
      throw error;
    });

  const decoded = querystring.parse(githubToken);

  const accessToken = decoded.access_token;

  return axios
    .get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error(`Error getting user from GitHub`);
      throw error;
    });
}

router.get("/github", async (req: Request, res: Response) => {
  const code = get(req, "query.code");
  const path = get(req, "query.path", "/");

  console.log(path);

  if (!code) {
    throw new Error("No code!");
  }

  const gitHubUser = await getGitHubUser({ code });

  const token = jwt.sign(gitHubUser, secret);

  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
  });

  res.redirect(`http://localhost:3000${path}`);
});

export default router;
