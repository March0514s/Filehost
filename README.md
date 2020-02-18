# FileHost

Simple react implementation of a Filehost service.
![](https://i.imgur.com/tWzuEX4.png)

## Usage

After cloning the repository in your preferred location:

Install the node modules on the backend using:
>yarn install

Run the backend server using:
>yarn start

Reach for the /client folder and repeat the process:
>yarn install

Run the cliend using:
>yarn start

## Login

The authentication of this project is restricted to a test user:

>Login: marcus
>Password: 1234

## Troubleshooting

If after loading the main page of the Filehost doesn't disappear, check if the code in the file `dirEntries.json` located in 
`/data/db` contains at least one line: 

>{"_id":"root"}

## License

![](https://www.gnu.org/graphics/agplv3-155x51.png)

FileHost is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

## Exclusion of warranty

FileHost is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

A copy of AGPLv3 can be found in [COPYING.](COPYING)
