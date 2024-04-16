const fs = require('fs');
const path = require('path');
const Math = require('../DB/models/subjects/maths');
const Chemistry = require('../DB/models/subjects/chemistry');
const Physics = require('../DB/models/subjects/physics');
const Biology = require('../DB/models/subjects/biology');
const Computer = require('../DB/models/subjects/computer');

const filePath = path.join(__dirname, '/FileStorage/quizes/');

const mathPath = path.join(filePath, 'math.json');
const chemistryPath = path.join(filePath, 'chemistry.json');
const physicsPath = path.join(filePath, 'physics.json');
const biologyPath = path.join(filePath, 'biology.json');
const computerPath = path.join(filePath, 'computer.json');

// Read and insert Math data
fs.readFile(mathPath, 'utf8', async (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    try {
        const mathData = JSON.parse(data);
        const questions = mathData.questions;

        for (const question of questions) {
            const math = new Math(question);
            await math.save();
        }

        console.log('Math questions inserted successfully.');
    } catch (error) {
        console.error('Error parsing or inserting Math data:', error);
    }
});

// Read and insert Chemistry data
fs.readFile(chemistryPath, 'utf8', async (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    try {
        const chemData = JSON.parse(data);
        const questions = chemData.questions;

        for (const question of questions) {
            const chemistry = new Chemistry(question);
            await chemistry.save();
        }
    } catch (error) {
        console.error('Error parsing or inserting Chemistry data:', error);
    }
});

// Read and insert Physics data
fs.readFile(physicsPath, 'utf8', async (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    try {
        const phyData = JSON.parse(data);
        const questions = phyData.questions;

        for (const question of questions) {
            const physics = new Physics(question);
            await physics.save();
        }
    } catch (error) {
        console.error('Error parsing or inserting Physics data:', error);
    }
});


// Read and insert Biology data
fs.readFile(biologyPath, 'utf8', async (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    try {
        const bioData = JSON.parse(data);
        const questions = bioData.questions;

        for (const question of questions) {
            const biology = new Biology(question);
            await biology.save();
        }
    } catch (error) {
        console.error('Error parsing or inserting Physics data:', error);
    }
});

// Read and insert Computer data
fs.readFile(computerPath, 'utf8', async (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    try {
        const compData = JSON.parse(data);
        const questions = compData.questions;

        for (const question of questions) {
            const computer = new Computer(question);
            await computer.save();
        }
    } catch (error) {
        console.error('Error parsing or inserting Physics data:', error);
    }
});

module.exports = {
    Math,
    Chemistry,
    Physics,
    Biology,
    Computer
};
