export class UserCharacter {
  id = 0
  characterName = ''
  serverName = ''
  teamId = 0
  favoriteItemId = ''
  password = 0

  constructor(id, characterName, serverName, password, teamId = 0, favoriteItemId = '') {
    this.id = id
    this.characterName = characterName
    this.serverName = serverName
    this.teamId = teamId
    this.favoriteItemId = favoriteItemId
    this.password = password
  }
}