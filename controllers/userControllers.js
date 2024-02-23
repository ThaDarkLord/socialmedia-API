const { User, Thought } = require('../models');
module.exports = {
    // grab all users
    async grabUsers(req, res){
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            res.status(500).json(error)
        }
    },
    // gets specific user by id
async grabOneUser(req, res){
    try {
        const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');
      if (!user) {
        return res.status(404).json({ message: 'No user exists with that ID' });
      }
      res.json(user);
    } catch (error) {
        res.status(500).json(error);
    }
},
// adds new user
async newUser(req, res){
    try {
        const user = await User.create(req.body);
      res.json(user);
    } catch (error) {
        res.status(500).json(error)
    }
},
// removes user
async removeUser(req, res){
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });
      
            if (!user) {
              return res.status(404).json({ message: 'No user with that ID' });
            }
      
            await Thought.deleteMany({ _id: { $in: user.thought } });
            res.json({ message: 'User and associated apps deleted!' })
    } catch (error) {
        res.status(500).json(error)
    }
},
// update a user
async updateUser(req, res){
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
          );
    
          if (!user) {
            return res.status(404).json({ message: 'No user exists with this id!' });
          }
    
          res.json(user);
    } catch (error) {
      res.status(500).json(error);
        
    }
},
// remove friend
async removeFriend(req, res){
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.applicationId },
            { $pull: { friend: { friendId: req.params.friendId } } },
            { runValidators: true, new: true }
          );
    
          if (!User) {
            return res.status(404).json({ message: 'No user exists with this id!' });
          }
    
          res.json(user);
    } catch (error) {
      res.status(500).json(err);
    }
},
// add friend
async addFriend(req, res){
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { friend: req.body } },
            { runValidators: true, new: true }
          );
    
          if (!user) {
            return res.status(404).json({ message: 'No user exists with this id!' });
          }
    res.json(user);
    } catch (error) {
      res.status(500).json(err);
    }
}

}