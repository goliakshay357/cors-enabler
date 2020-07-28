const axios = require('axios')

const API_URL = (channelName) => `${channelName}/`

async function getChatters(req,res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another option
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  
  try {
    const {channelName = 'demo'} = req.query;
    const {data} = await axios.get(API_URL(channelName));
    res.send(data);
  } catch (error) {
    res.status(500)
    const response = error.response || {}
    console.log("Returing!");
    
    res.send({
      message:error.message,
      response
    })
  }
}

module.exports = getChatters;