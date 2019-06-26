let MongoClient = require("mongodb").MongoClient;

class PlatformerActiveUsers  {

  constructor(config) {

    this.config = config;

    MongoClient.connect(config.getDatabaseRoot, { useNewUrlParser: true }, function(error, db) {
      if (error) {
        console.warn("MyDatabase : err1:" + error);
        return;
      }

      const dbo = db.db(config.databaseName);

      dbo.listCollections().toArray(function(err, data) {
        data.forEach(function(item){
          console.log("List :", item.name);
        })
      });

      dbo.createCollection("platformer", function(err, collection) {

        if (err) throw err;
          collection.createIndex({ "token": 1 }, { unique: false });
          collection.createIndex({ "rank": 1 }, { unique: false });
          collection.createIndex({ "nickname": 1 }, { unique: false });
          collection.createIndex({ "lives": 3 }, { unique: false });
          db.close();

      });

    });

  }

  addActiveGamePlayer(user, callerInstance) {

    const databaseName = callerInstance.config.databaseName;
    MongoClient.connect(callerInstance.config.getDatabaseRoot, { useNewUrlParser: true }, function(error, db) {
      if (error) {
        console.warn("ActiveGame err:" + error);
        return;
      }
      console.log("test2");
      const dbo = db.db(databaseName);
      dbo.collection("platformer").findOne({ token: user.token },
        function(err, result) {
          if (err) {
            console.log("activeplayers err : " + err);
            return null;
          }
          console.log(result)
          if (result == null) {
            dbo.collection("platformer").insertOne({
              nickname: user.nickname,
              token: user.token,
              rank: user.rank

            }, function(err, result) {
              if (err) {
                console.log("platformer err2:" + err);
                db.close();
                return;
              }
              console.log("ADDED NEW GAME", result);
              if (result) {
                console.log("ADDED NEW GAME", result);
              }
              // callerInstance.onRegisterResponse("USER_REGISTERED", callerInstance);
              db.close();
            });



          } else {

            console.log("=====================================================================================")
            console.log("ActiveGame.addActiveGame (User have open game already, disallow to play any game more):" + err);
            console.log("=====================================================================================")
            return null;

          }

        });

    });

  }

  removeActiveGamePlayer(user, callerInstance) {

    const databaseName = this.config.databaseName;
    MongoClient.connect(this.config.getDatabaseRoot, { useNewUrlParser: true }, function(error, db) {
      if (error) {
        console.warn("ActiveGame err:" + error);
        return;
      }

      const dbo = db.db(databaseName);
      dbo.collection("platformer-au").findOne({ token: user.token },
        function(err, result) {
          if (err) {
            console.log("ActiveGame.removeActiveGamePlayer (err1):" + err);

            dbo.collection("platformer-au").insertOne({
              nickname: user.nickname,
              token: user.token,
              rank: rank
            }, function(err, result) {
              if (err) {
                console.log("ActiveGame err2:" + err);
                db.close();
                return;
              }
              console.log("ADDED NEW GAME", result);
              if (result) {
                console.log("ADDED NEW GAME", result);
              }
              // callerInstance.onRegisterResponse("USER_REGISTERED", callerInstance);
              db.close();
            });

            return null;
          }
          if (result !== null) {
            console.log("ActiveGame.platformer-au User have open game already:" + err);
            return null;
          }

        });

    });

  }
}
module.exports = PlatformerActiveUsers;
