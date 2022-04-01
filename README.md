## Youtube Videos Sharing Application Sample

### Tech stacks

1. PostgreSQL 14.2-1
2. Express.js 4.17.3
3. React.js 18.0.0
4. Node.js 16.14.2
5. Docker 4.6.1
6. Nginx (Docker image) 1.21.6
7. Heroku-cli (Server-side Deployment, Github CD) 7.60.1-beta
8. Netlify (Client-side Deployment, Github CD)

### Prerequisites

1. Make sure you rename .env.example to .env files, There is one in [backend folder](./backend/.env.example) and one in [parent directory](./.env.example).
2. You should add your own <span style="color:blue">JWT_SECRET</span> and <span style="color:blue">YOUTUBE_API_KEY</span>. For the <span style="color:blue">YOUTUBE_API_KEY</span>, please follow this [guide](https://developers.google.com/youtube/v3/getting-started) to obtain one. These can be changed in backend [.env.example](./backend/.env.example) file.

```dotenv
JWT_SECRET="jwt_secret_here"
YOUTUBE_API_KEY="youtube_api_key_here"
```

### Local Usage

1. Follow the [Makefile](./Makefile) commands for better experience, here is the list of commands:

```Makefile
make help
make start
make stop
make clean
```
