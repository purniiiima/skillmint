const User = require('../models/User');

// Simple matching: count overlap between user's skillsOffered and others' skillsWanted (or vice versa)
exports.suggest = async (req, res) => {
  try {
    const me = req.user;
    if(!me) return res.status(401).json({ message: 'Unauthorized'});
    const all = await User.find({ _id: { $ne: me._id } });
    const scored = all.map(u => {
      const offerMatch = (u.skillsWanted || []).filter(s => (me.skillsOffered || []).includes(s)).length;
      const wantMatch = (u.skillsOffered || []).filter(s => (me.skillsWanted || []).includes(s)).length;
      const score = offerMatch + wantMatch;
      return { user: u, score };
    }).filter(x => x.score>0).sort((a,b)=> b.score - a.score).slice(0,10);
    res.json(scored.map(s => ({ user: { id: s.user._id, name: s.user.name, avatarUrl: s.user.avatarUrl, skillsOffered: s.user.skillsOffered }, score: s.score })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
