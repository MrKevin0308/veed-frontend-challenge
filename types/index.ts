interface IGitOwner {
  login: string;
  avatar_url: string;
}

export type TTabValue = 'all' | 'fav';

export interface IGitRepo {
  id: number;
  full_name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  owner: IGitOwner;
}