const { Thought, User} = require('../models');

module.exports = {

async grabThought(req, res){
    try {
        const thought = await Thought.find();
        res.json(thought);
    } catch (error) {
        res.status(500).json(error);
    }
},

async grabOneThought(req, res){
    try {
        const thought = await Thought.findOne({_id: req.params.thoughtId});

        if (!thought) {
            return res.status(404).json({ message: 'No thought associated with that ID' });
          }
    
          res.json(thought);
    } catch (error) {
        res.status(500).json(error)
    }
},

async newThought(req, res){
    try {
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thought: thought._id } },
          { new: true }
        );
        
        if (!user) {
          return res.status(404).json({
            message: 'Thought was created, but found no user with the associated ID',
          })
        }
        
        res.json('What a great thought! 🎉');
    } catch (error) {
      res.status(500).json(error);
    }
  
},

async updateThought(req, res){
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
          );
    
          if (!thought) {
            return res.status(404).json({ message: 'No thought with the associated id!' });
          }
    
          res.json(thought);
    } catch (error) {
      res.status(500).json(error);
    }
},

async removeThought(req, res){
    try {
        const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

        if (!thought) {
          return res.status(404).json({ message: 'No thought with the associated id!' });
        }
  
        const user = await User.findOneAndUpdate(
          { applications: req.params.thoughtId },
          { $pull: { thought: req.params.thoughtId } },
          { new: true }
        );
  
        if (!user) {
          return res.status(404).json({
            message: ' A special thought was created with that ID!',
          });
        }
  
        res.json({ message: 'Your thought was successfully deleted!' });
    } catch (error) {
      res.status(500).json(error);
        
    }
},
async addReaction(req, res){
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reaction: req.body } },
            { runValidators: true, new: true }
          );
    
          if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
          }
    
          res.json(thought);
    } catch (error) {
      res.status(500).json(error);
    }
},

async removeReaction(req, res){
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reaction: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
          );
    
          if (!thought) {
            return res.status(404).json({ message: 'No application with this id!' });
          }
    
          res.json(thought);
    } catch (error) {
      res.status(500).json(error); 
    }
}


}