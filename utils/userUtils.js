const fetch = require('node-fetch');
const routesNames = require('../constants/route-names');
const config = require('./config');

const getUsersByCompanyName = async (companyName) => {
    const response = await fetch(`${config.TYPICODE_URL}${routesNames.users}`);
    const allUsers = await response.json();
    const resultUsers = allUsers.filter(user=>user.company.name.toLowerCase()
    .includes(companyName.toLowerCase()));

    return resultUsers;
 }

 const getPostsForUser = async (user) => {
    const response = await fetch(`${config.TYPICODE_URL}${routesNames.posts}?userId=${user.id}`);
    const posts = await response.json();
    
    return posts;
 }

 const getUserById = async (id) => {
    const response = await fetch(`${config.TYPICODE_URL}${routesNames.users}/${id}`);
    
    return await response.json();
 }


 const getPosts = async () => {
    const response = await fetch(`${config.TYPICODE_URL}${routesNames.posts}`);
    
    return await response.json();
 }

 const getSortedUsers = async () => {
   const response = await fetch(`${config.TYPICODE_URL}${routesNames.users}`);
   const users = await response.json();
        const domains = [".org", ".net", ".com"];
        let filteredUsers = [];
        domains.forEach(domain => {
            filteredUsers = filteredUsers.concat(users.filter(user => user.website.includes(domain)));
        })
        filteredUsers = filteredUsers.sort((userA, userB) => (userA?.address?.city).localeCompare(userB?.address?.city));
      
      return filteredUsers;
 }

 module.exports = {
    getUsersByCompanyName,
    getPostsForUser,
    getPosts,
    getUserById,
    getSortedUsers
}