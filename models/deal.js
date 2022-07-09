const Sequelize = require('sequelize');

module.exports = class Deal extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      title : {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      content : {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      price : {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      dealDate : {
        type: Sequelize.DATE,
        allowNull: false,
      },
      dealPlace : { // dealSpot? 장소 테이블을 하나더 만들어야하나.
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      isDealDone : {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue : false,
      },
      totalMember : {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      currentMember : { // 관계식으로 작성해야되나.?
        type: Sequelize.INTEGER,
        allowNull: false,
      },

    }, { // 글 삭제 여부(추가?) ||  작성시간(timestamp?), 현재모집인원(수정 필요), 
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Deal',
      tableName: 'deals',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.Deal.belongsTo(db.User, {foreignKey : 'userId', targetKey : 'id' });
    db.Deal.hasMany(db.Group, {foreignKey : 'dealId', sourceKey : 'id' }); // Deal 테이블에 dealId 속성이 있는데 어떻게 업데이트 하지?
  }
};
