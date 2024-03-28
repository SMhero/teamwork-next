# Teamwork

Teamwork is an application to help team leaders guide team members to the right way.

## Stack

- `Next.js`
- `TypeScript`
- `Tailwind`
- `Zustand`

## Commands

```bash
pnpm run dev # run development server
pnpm run build # building the app for productions deploy
pnpm run lint # linting of the app code
```

## Before you start ⚠️

The project use `pnpm` package manager. It's really fast and handy but you can use any package manager that you want, like, `npm` or `yarn`.

Now, the project works only with mocked data. Based on that you should create a folder named `mock` in `src` directory and put two `JSON` files below;

`user.json`:

```json
{
  "user": {
    "email": "mcmahon@teamwork.com",
    "firstName": "Vince",
    "lastName": "McMahon"
  },
  "teamlead": {
    "timezone": "America/USA",
    "photoUrl": "/mock/vince_mcmahon.png",
    "defaultMeetingDuration": 60
  },
  "team": "World Wrestling Entertainment (WWE)"
}
```

`teammates.json`:

```json
[
  {
    "id": 32,
    "name": "Dwayne Johnson",
    "position": "If you smell what I'm cooking",
    "photo": "/mock/dwyane_johnson.png",
    "teamName": "World Wrestling Entertainment (WWE)",
    "teamId": 1
  },
  {
    "id": 33,
    "name": "John Cena",
    "position": "And his name is John Cena",
    "photo": "/mock/john_cena.png",
    "teamName": "World Wrestling Entertainment (WWE)",
    "teamId": 1
  },
  {
    "id": 34,
    "name": "Paul Levesque",
    "position": "HHH",
    "photo": "/mock/paul_levesque.png",
    "teamName": "World Wrestling Entertainment (WWE)",
    "teamId": 1
  }
]
```

Then you can authorized with any email or password.
