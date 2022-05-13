export class UserCharacter {
  id = 0
  characterName = ''
  serverName = ''
  teamId = 0
  favoriteItemId = []
  password = 0

  constructor(id, characterName, serverName, password, teamId = 0, favoriteItemId = []) {
    this.id = id
    this.characterName = characterName
    this.serverName = serverName
    this.teamId = teamId
    this.favoriteItemId = favoriteItemId
    this.password = password
  }

  get id() {
    return this.id
  }

  get characterName() {
    return this.characterName
  }

  get serverName() {
    return this.serverName
  }

  get teamId() {
    return this.teamId
  }

  get favoriteItemId() {
    return this.favoriteItemId
  }

}