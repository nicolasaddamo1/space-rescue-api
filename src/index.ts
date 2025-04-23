import { log } from 'console';
import express from 'express'
import { Request, Response } from 'express'

const app = express()
const PORT = process.env.PORT || 3000;

const DAMAGED_SYSTEM: { [key: string]: string } = {
    "navigation": "NAV-01",
    "communications": "COM-02",
    "life_support": "LIFE-03",
    "engines": "ENG-04",
    "deflector_shield": "SHLD-05"
};

let selectedSystem: string = "";

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    next()
});

app.get('/status', (req: Request, res: Response) => {
    if (selectedSystem) {
        const systems = Object.keys(DAMAGED_SYSTEM);
        const randomIndex = Math.floor(Math.random() * systems.length);
        selectedSystem = systems[randomIndex];
    }
    console.log(`Reporting damaged system: ${selectedSystem}`);
    res.json({
        damaged_system: selectedSystem
    });
});

app.get('/repair-bay', (req: Request, res: Response) => {
    if (selectedSystem) {
        const systems = Object.keys(DAMAGED_SYSTEM);
        const randomIndex = Math.floor(Math.random() * systems.length);
        selectedSystem = systems[randomIndex];
    }

    const repairCode = DAMAGED_SYSTEM[selectedSystem]

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Repair</title>
</head>
<body>
    <div class="anchor-point>${repairCode} for system: ${selectedSystem} </div>
</body>
</html>
`;


    console.log(`Repair bay requested. Showing code: ${repairCode} for system: ${selectedSystem}`);


    res.setHeader('Content-Type', 'text/html');
    res.send(htmlContent);
});

app.post('/teapot', (req: Request, res: Response) => {
    console.log('I\' m a teapot!');
    res.status(418).send("I'm a teapot!");
});

app.listen(PORT, () => {
    console.log('Space Rescye API is running on port ' + PORT);
    console.log('Endpoints available:');
    console.log('- GET /status - Reports damaged system');
    console.log('- GET /repair-bay');
    console.log();
}
);