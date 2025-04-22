export const serverConfig = {
    PORT: 3000,
    PUBLIC: (url) => process.cwd() + '/public' + url,
    VIEWS: (url) => process.cwd() + '/src/views' + url,
    USERS: () => process.cwd() + '/users.json',
    POSTS: () => process.cwd() + '/posts.json',
}