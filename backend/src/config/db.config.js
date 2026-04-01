const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("Database connected");
        
    } catch (err) {
        console.error(err);
        process.exit(1);
        
    }
}

module.exports = { prisma, connectDB };