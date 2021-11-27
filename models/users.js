import { db, DataTypes } from './dbConfig'

export default db.define(
  'users',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    avatarId: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: null
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      defaultValue: null,
      get() {
        if (this.lastName == null) {
          return this.firstName
        } else {
          return this.firstName + ' ' + this.lastName
        }
      },
      set(value) {
        throw new Error('Not set value')
      }
    },
    avatarUrl: {
      type: DataTypes.VIRTUAL,
      defaultValue: null,
      get() {
        if (this.avatarId != null) {
          return 'http://localhost:5000/api/storage/' + this.avatarId
        } else {
          let firstName = ''
          if (this.firstName != null) {
            firstName = this.firstName
          }
          let lastName = ''
          if (this.lastName != null) {
            lastName = this.lastName
          }
          return (
            'https://ui-avatars.com/api/?name=' +
            firstName.replace(' ', '+') +
            '+' +
            lastName.replace(' ', '+')
          )
        }
      },
      set(value) {
        throw new Error('Do not try to set the `avatarUrl` value!')
      }
    }
  },
  {
    freezeTableName: true,
    indexes: [
      {
        fields: ['email'],
        unique: true
      }
    ]
  }
)
