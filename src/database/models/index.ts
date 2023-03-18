const Sequelize = require('sequelize');
const config = require('../../config');
const env = config.env || 'development';
const dbConfig = require('../../config/config.json')[env];
const { User } = require('./user');
const { Deal } = require('./deal');
const { Group } = require('./group');
const { Comment } = require('./comment');
const { Reply } = require('./reply');
const { DealImage } = require('./dealImage');
const { DealReport } = require('./dealReport');
const { UserReport } = require('./userReport');
const { Event } = require('./event');
const { Price } = require('./price');
type dbType = {
  sequelize?: any;
  Deal?: any;
  User?: any;
  Group?: any;
  Comment?: any;
  Reply?: any;
  DealImage?: any;
  DealReport?: any;
  UserReport?: any;
  Event?: any;
  Price?: any;
};
const db: dbType = {};

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig,
);

db.sequelize = sequelize;
db.Deal = Deal;
db.User = User;
db.Group = Group;
db.Comment = Comment;
db.Reply = Reply;
db.DealImage = DealImage;
db.DealReport = DealReport;
db.UserReport = UserReport;
db.Event = Event;
db.Price = Price;

Deal.init(sequelize);
User.init(sequelize);
Group.init(sequelize);
Comment.init(sequelize);
Reply.init(sequelize);
DealImage.init(sequelize);
DealReport.init(sequelize);
UserReport.init(sequelize);
Event.init(sequelize);
Price.init(sequelize);

Deal.associate(db);
User.associate(db);
Group.associate(db);
Comment.associate(db);
Reply.associate(db);
DealImage.associate(db);
DealReport.associate(db);
UserReport.associate(db);
Price.associate(db);

export { db };
