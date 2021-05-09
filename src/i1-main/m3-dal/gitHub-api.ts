import axios from "axios";

const instance = axios.create({
    baseURL: 'https://api.github.com',
})

export type UsersDataType = {
    avatar_url: string
    events_url: string
    followers_url: string
    following_url: string
    gists_url: string
    gravatar_id: string
    html_url: string
    id: number
    login: string
    node_id: string
    organizations_url: string
    received_events_url: string
    repos_url: string
    score: number
    site_admin: boolean
    starred_url: string
    subscriptions_url: string
    type: string
    url: string
}

export type UserDataType = {
    avatar_url: string
    bio: null | any
    blog: string
    company: null | any
    created_at: string
    email: null | any
    events_url: string
    followers: number
    followers_url: string
    following: number
    following_url: string
    gists_url: string
    gravatar_id: string
    hireable: null | any
    html_url: string
    id: number
    location: null | any
    login: string
    name: string
    node_id: string
    organizations_url: string
    public_gists: number
    public_repos: number
    received_events_url: string
    repos_url: string
    site_admin: boolean
    starred_url: string
    subscriptions_url: string
    twitter_username: null | any
    type: string
    updated_at: string
    url: string
}

export type ReposDataType = {
    archive_url: string
    archived: boolean
    assignees_url: string
    blobs_url: string
    branches_url: string
    clone_url: string
    collaborators_url: string
    comments_url: string
    commits_url: string
    compare_url: string
    contents_url: string
    contributors_url: string
    created_at: string
    default_branch: string
    deployments_url: string
    description: string
    disabled: boolean
    downloads_url: string
    events_url: string
    fork: boolean
    forks: number
    forks_count: number
    forks_url: string
    full_name: string
    git_commits_url: string
    git_refs_url: string
    git_tags_url: string
    git_url: string
    has_downloads: boolean
    has_issues: boolean
    has_pages: boolean
    has_projects: boolean
    has_wiki: boolean
    homepage: null | any
    hooks_url: string
    html_url: string
    id: number
    issue_comment_url: string
    issue_events_url: string
    issues_url: string
    keys_url: string
    labels_url: string
    language: string
    languages_url: string
    license: { key: string, name: string, spdx_id: string, url: string, node_id: string }
    merges_url: string
    milestones_url: string
    mirror_url: null | any
    name: string
    node_id: string
    notifications_url: string
    open_issues: number
    open_issues_count: number
    owner: { login: string, id: number, node_id: string, avatar_url: string, gravatar_id: string }
    private: boolean
    pulls_url: string
    pushed_at: string
    releases_url: string
    size: number
    ssh_url: string
    stargazers_count: number
    stargazers_url: string
    statuses_url: string
    subscribers_url: string
    subscription_url: string
    svn_url: string
    tags_url: string
    teams_url: string
    trees_url: string
    updated_at: string
    url: string
    watchers: number
    watchers_count: number
}

export const githubAPI = {
    getUsers(userName: string) {
        return instance.get(`/search/users?q=${userName}+in:user`)
    },
    getProfile(userName: string) {
        return instance.get(`/users/${userName}`)
    },
    getRepos(userName: string) {
        return instance.get(`/users/${userName}/repos`)
    }
}

