const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      email: {
        type: Sequelize.STRING(40),
        allowNull: true,
      },
      nick: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      provider: { //snsType
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: 'local',
      },
      snsId: {
        type: Sequelize.STRING(70),
        allowNull: true,
      },
      curLocation1:{
        type:Sequelize.STRING(),
        allowNull:true,
      },
      curLocation2: {
        type: Sequelize.STRING(),
        allowNull: true,
      },
      curLocation3: {
        type: Sequelize.STRING(),
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: true,
      charset: 'utf8', //mb4 적용해야지 이모티콘 사용 가능
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.User.hasMany(db.Group, { foreignKey : 'userId', sourceKey : 'id' } );
    db.User.hasOne(db.Deal, {foreignKey : 'userId', targetKey : 'id' });
  }
};
