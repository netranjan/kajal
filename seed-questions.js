require('dotenv').config();
const mongoose = require('mongoose');
const Question = require('./models/Question');

// Exactly 60 questions: 30 Space Science + 30 Birds
const allQuestions = [
    {
        q: "Which planet is known as the Red Planet?",
        opts: ["Mars", "Venus", "Jupiter", "Mercury"],
        ans: 0,
        fact: "Mars appears reddish because iron minerals in its surface rocks and dust have oxidized."
    },
    {
        q: "Which is the largest planet in our solar system?",
        opts: ["Saturn", "Jupiter", "Neptune", "Earth"],
        ans: 1,
        fact: "Jupiter is the largest planet in the solar system by both diameter and mass."
    },
    {
        q: "Which planet is closest to the Sun?",
        opts: ["Venus", "Earth", "Mercury", "Mars"],
        ans: 2,
        fact: "Mercury is the innermost planet and completes an orbit around the Sun in about 88 Earth days."
    },
    {
        q: "Which planet is famous for its prominent ring system?",
        opts: ["Mars", "Saturn", "Venus", "Mercury"],
        ans: 1,
        fact: "Saturn has the most extensive and easily visible ring system in the solar system."
    },
    {
        q: "What is the name of Earth's natural satellite?",
        opts: ["Europa", "Titan", "Moon", "Phobos"],
        ans: 2,
        fact: "The Moon is Earth's only natural satellite and takes about 27.3 days to orbit Earth relative to the stars."
    },
    {
        q: "What force keeps planets in orbit around the Sun?",
        opts: ["Magnetism", "Gravity", "Friction", "Electricity"],
        ans: 1,
        fact: "The Sun's gravity provides the inward pull that keeps planets in their orbits."
    },
    {
        q: "What is a star?",
        opts: ["A rocky planet", "A ball of hot plasma", "A frozen moon", "A cloud of dust"],
        ans: 1,
        fact: "Stars are enormous, hot balls of plasma that produce energy through nuclear fusion in their cores."
    },
    {
        q: "What galaxy contains our solar system?",
        opts: ["Andromeda Galaxy", "Whirlpool Galaxy", "Milky Way Galaxy", "Sombrero Galaxy"],
        ans: 2,
        fact: "Our solar system is located in the Milky Way, a large spiral galaxy."
    },
    {
        q: "What is the Sun mainly made of?",
        opts: ["Iron and rock", "Hydrogen and helium", "Oxygen and carbon", "Water and nitrogen"],
        ans: 1,
        fact: "The Sun is composed mostly of hydrogen and helium."
    },
    {
        q: "Which planet has the hottest average surface temperature?",
        opts: ["Mercury", "Venus", "Mars", "Jupiter"],
        ans: 1,
        fact: "Venus is the hottest planet on average because its thick carbon-dioxide atmosphere creates an intense greenhouse effect."
    },
    {
        q: "What is a light-year used to measure?",
        opts: ["Time", "Mass", "Distance", "Temperature"],
        ans: 2,
        fact: "A light-year is a unit of distance equal to the distance light travels in one year."
    },
    {
        q: "What do we call a rocky object that enters Earth's atmosphere and produces a streak of light?",
        opts: ["Meteor", "Asteroid", "Comet", "Planet"],
        ans: 0,
        fact: "A meteor is the visible streak produced when a meteoroid heats up while passing through an atmosphere."
    },
    {
        q: "Which planet rotates on its side compared with most other planets?",
        opts: ["Uranus", "Mars", "Earth", "Mercury"],
        ans: 0,
        fact: "Uranus has an extreme axial tilt of about 98 degrees, making it appear to rotate on its side."
    },
    {
        q: "What is the largest moon in the solar system?",
        opts: ["Titan", "Ganymede", "Europa", "Triton"],
        ans: 1,
        fact: "Ganymede, a moon of Jupiter, is the largest moon in the solar system."
    },
    {
        q: "Which planet is known for the Great Red Spot?",
        opts: ["Saturn", "Neptune", "Jupiter", "Mars"],
        ans: 2,
        fact: "Jupiter's Great Red Spot is a gigantic long-lasting storm in its atmosphere."
    },
    {
        q: "What is the name of the boundary around a black hole beyond which light cannot escape?",
        opts: ["Solar wind", "Event horizon", "Asteroid belt", "Magnetosphere"],
        ans: 1,
        fact: "The event horizon is the boundary beyond which escape from a black hole is impossible."
    },
    {
        q: "What is a comet mostly made of?",
        opts: ["Ice, dust and rock", "Molten iron", "Liquid water", "Pure gas"],
        ans: 0,
        fact: "Comets contain ice mixed with dust and rocky material and can develop glowing comas and tails near the Sun."
    },
    {
        q: "Which planet has the fastest rotation in the solar system?",
        opts: ["Earth", "Jupiter", "Saturn", "Neptune"],
        ans: 1,
        fact: "Jupiter rotates once in roughly 10 hours, the fastest rotation of any planet."
    },
    {
        q: "What causes Earth's seasons?",
        opts: ["Earth's distance from the Sun alone", "The Moon's gravity", "Earth's axial tilt as it orbits the Sun", "Solar flares"],
        ans: 2,
        fact: "Earth's approximately 23.5-degree axial tilt changes how sunlight is distributed during its orbit."
    },
    {
        q: "What is the asteroid belt mainly located between?",
        opts: ["Earth and Mars", "Mars and Jupiter", "Jupiter and Saturn", "Venus and Earth"],
        ans: 1,
        fact: "Most known solar-system asteroids orbit in the main asteroid belt between Mars and Jupiter."
    },
    {
        q: "Which planet is farthest from the Sun among the eight planets?",
        opts: ["Uranus", "Saturn", "Neptune", "Jupiter"],
        ans: 2,
        fact: "Neptune is the eighth and farthest recognized planet from the Sun."
    },
    {
        q: "What is a nebula?",
        opts: ["A type of planet", "A cloud of gas and dust in space", "A kind of asteroid", "A black hole's surface"],
        ans: 1,
        fact: "Nebulae are large clouds of gas and dust found throughout galaxies."
    },
    {
        q: "Which planet has the longest day measured by its rotation period?",
        opts: ["Venus", "Mars", "Earth", "Mercury"],
        ans: 0,
        fact: "Venus rotates extremely slowly; one rotation relative to the stars takes about 243 Earth days."
    },
    {
        q: "What powers the Sun?",
        opts: ["Burning coal", "Nuclear fusion", "Chemical combustion", "Lightning"],
        ans: 1,
        fact: "The Sun generates most of its energy by nuclear fusion, converting hydrogen into helium."
    },
    {
        q: "What is the name of the first human-made object to reach the Moon?",
        opts: ["Apollo 11", "Luna 2", "Voyager 1", "Sputnik 1"],
        ans: 1,
        fact: "The Soviet Luna 2 spacecraft became the first human-made object to reach the Moon in 1959."
    },
    {
        q: "Which planet is known for having a day longer than its year?",
        opts: ["Mars", "Venus", "Earth", "Neptune"],
        ans: 1,
        fact: "Venus takes about 243 Earth days to rotate once but about 225 Earth days to orbit the Sun."
    },
    {
        q: "What is a supernova?",
        opts: ["A type of comet", "A powerful stellar explosion", "A small asteroid", "A planet forming its rings"],
        ans: 1,
        fact: "A supernova is a powerful explosion associated with the death of certain stars."
    },
    {
        q: "Which moon of Saturn has a thick atmosphere and lakes of liquid methane and ethane?",
        opts: ["Titan", "Enceladus", "Rhea", "Mimas"],
        ans: 0,
        fact: "Titan is Saturn's largest moon and has a dense nitrogen-rich atmosphere and surface lakes of liquid hydrocarbons."
    },
    {
        q: "What is the name of the first artificial satellite launched into space?",
        opts: ["Apollo 8", "Sputnik 1", "Hubble", "Luna 1"],
        ans: 1,
        fact: "Sputnik 1, launched in 1957, was the first artificial satellite to orbit Earth."
    },
    {
        q: "What does a telescope primarily help astronomers do?",
        opts: ["Create gravity", "Collect and analyze light", "Change planetary orbits", "Stop solar wind"],
        ans: 1,
        fact: "Telescopes collect electromagnetic radiation so astronomers can observe and study distant objects."
    },

    {
        q: "Which bird is the largest living bird?",
        opts: ["Eagle", "Ostrich", "Swan", "Albatross"],
        ans: 1,
        fact: "The ostrich is the largest living bird and is also the fastest-running bird on land."
    },
    {
        q: "Which bird is known for its ability to mimic human speech?",
        opts: ["Parrot", "Penguin", "Ostrich", "Owl"],
        ans: 0,
        fact: "Many parrots can imitate human speech and other sounds because of their vocal learning abilities."
    },
    {
        q: "Which bird is the fastest when diving?",
        opts: ["Peregrine Falcon", "Eagle", "Swan", "Heron"],
        ans: 0,
        fact: "The peregrine falcon can exceed 300 km/h during a hunting dive, making it the fastest animal in a dive."
    },
    {
        q: "Which bird cannot fly but is an excellent swimmer?",
        opts: ["Penguin", "Eagle", "Sparrow", "Parrot"],
        ans: 0,
        fact: "Penguins are flightless birds whose wings have evolved into flipper-like structures for swimming."
    },
    {
        q: "What do birds use their beaks for?",
        opts: ["Only singing", "Feeding and other tasks", "Only flying", "Only sleeping"],
        ans: 1,
        fact: "Bird beaks are adapted for feeding and can also be used for grooming, defense, nest building and other tasks."
    },
    {
        q: "Which bird is famous for its long, colorful tail feathers?",
        opts: ["Peacock", "Crow", "Pigeon", "Duck"],
        ans: 0,
        fact: "The male peacock displays its elaborate train of tail feathers during courtship."
    },
    {
        q: "Which bird is mainly active at night and is known for excellent low-light vision?",
        opts: ["Owl", "Swan", "Parrot", "Peacock"],
        ans: 0,
        fact: "Owls are mostly nocturnal and have adaptations that help them hunt in low-light conditions."
    },
    {
        q: "Which bird is known for storing food in caches?",
        opts: ["Woodpecker", "Kingfisher", "Penguin", "Flamingo"],
        ans: 0,
        fact: "Many woodpeckers, including acorn woodpeckers, store food in holes or crevices for later use."
    },
    {
        q: "What do flamingos often eat using their specialized bills?",
        opts: ["Algae and small aquatic organisms", "Large mammals", "Tree bark", "Seeds only"],
        ans: 0,
        fact: "Flamingos filter-feed on algae and small aquatic organisms from shallow water."
    },
    {
        q: "Which bird is famous for building large stick nests and often lives near water?",
        opts: ["Bald Eagle", "Sparrow", "Hummingbird", "Swift"],
        ans: 0,
        fact: "Bald eagles build very large nests, often in tall trees near lakes, rivers or coastlines."
    },
    {
        q: "Which bird can hover in place while feeding from flowers?",
        opts: ["Hummingbird", "Crow", "Ostrich", "Penguin"],
        ans: 0,
        fact: "Hummingbirds can hover by rapidly beating their wings and use long bills to reach flower nectar."
    },
    {
        q: "Which bird is known for its distinctive laughing call and is a member of the kingfisher family?",
        opts: ["Kookaburra", "Pelican", "Crane", "Vulture"],
        ans: 0,
        fact: "The kookaburra is a kingfisher-family bird famous for its distinctive call that sounds like laughter."
    },
    {
        q: "Which bird has a large pouch under its bill for catching fish?",
        opts: ["Pelican", "Owl", "Sparrow", "Falcon"],
        ans: 0,
        fact: "Pelicans use their expandable throat pouches to scoop up fish and water."
    },
    {
        q: "Which bird is known for its long-distance migration between polar regions?",
        opts: ["Arctic Tern", "Peacock", "Ostrich", "Kiwi"],
        ans: 0,
        fact: "Arctic terns make one of the longest regular migrations of any animal, traveling between Arctic and Antarctic regions."
    },
    {
        q: "Which bird is the national bird of India?",
        opts: ["Peacock", "Eagle", "Sparrow", "Swan"],
        ans: 0,
        fact: "The Indian peafowl, commonly called the peacock, is the national bird of India."
    },
    {
        q: "Which bird is famous for using its strong beak to crack nuts?",
        opts: ["Macaw", "Flamingo", "Penguin", "Heron"],
        ans: 0,
        fact: "Macaws have powerful curved beaks that can crack hard nuts and seeds."
    },
    {
        q: "Which bird is known for walking on the ground and having a long neck but cannot fly?",
        opts: ["Emu", "Swan", "Parrot", "Pigeon"],
        ans: 0,
        fact: "The emu is a large flightless bird native to Australia."
    },
    {
        q: "Which bird is associated with delivering messages in historical pigeon post?",
        opts: ["Homing pigeon", "Penguin", "Owl", "Flamingo"],
        ans: 0,
        fact: "Homing pigeons have been used to carry messages because of their strong ability to navigate back to their home."
    },
    {
        q: "Which bird has webbed feet that help it swim?",
        opts: ["Duck", "Eagle", "Woodpecker", "Owl"],
        ans: 0,
        fact: "Ducks have webbed feet that act like paddles and help them move through water."
    },
    {
        q: "Which bird is known for pecking holes in tree trunks?",
        opts: ["Woodpecker", "Swan", "Albatross", "Flamingo"],
        ans: 0,
        fact: "Woodpeckers use their specialized bills to excavate wood while searching for food and making nest cavities."
    },
    {
        q: "Which bird is famous for its enormous wingspan and life over the open ocean?",
        opts: ["Wandering Albatross", "Sparrow", "Pigeon", "Parrot"],
        ans: 0,
        fact: "The wandering albatross has one of the largest wingspans of any living bird and spends much of its life over the ocean."
    },
    {
        q: "Which bird is known for catching fish by diving into water?",
        opts: ["Kingfisher", "Peacock", "Ostrich", "Sparrow"],
        ans: 0,
        fact: "Kingfishers often plunge into water to catch fish and other aquatic prey."
    },
    {
        q: "What are baby birds commonly called?",
        opts: ["Chicks", "Calves", "Fawns", "Cubs"],
        ans: 0,
        fact: "Young birds are commonly called chicks, although some species have special names for their young."
    },
    {
        q: "Which bird is famous for its ability to fly backward?",
        opts: ["Hummingbird", "Eagle", "Owl", "Swan"],
        ans: 0,
        fact: "Hummingbirds are the only birds known to fly backward using their specialized wing movement."
    },
    {
        q: "Which bird is commonly associated with wisdom in stories and symbolism?",
        opts: ["Owl", "Duck", "Pigeon", "Flamingo"],
        ans: 0,
        fact: "Owls have long been associated with wisdom in many cultures, although the symbolism is not a scientific trait."
    },
    {
        q: "Which bird has a distinctive large casque-like structure on its bill and is found in tropical forests?",
        opts: ["Hornbill", "Swan", "Penguin", "Sparrow"],
        ans: 0,
        fact: "Hornbills are known for their large bills and, in many species, a casque above the bill."
    },
    {
        q: "Which bird is known for turning its head very far around?",
        opts: ["Owl", "Eagle", "Pelican", "Duck"],
        ans: 0,
        fact: "Many owls can rotate their heads by up to about 270 degrees because of specialized neck anatomy."
    },
    {
        q: "Which bird is famous for its elaborate courtship dances and colorful plumage in New Guinea?",
        opts: ["Bird-of-paradise", "Penguin", "Crow", "Pelican"],
        ans: 0,
        fact: "Many birds-of-paradise use elaborate displays, dances and specialized feathers during courtship."
    },
    {
        q: "Which bird is known for its black-and-white plumage and ability to live in very cold environments?",
        opts: ["Penguin", "Peacock", "Macaw", "Flamingo"],
        ans: 0,
        fact: "Penguins have dense feathers and body adaptations that help them survive in cold marine environments."
    },
    {
        q: "Which bird is commonly seen building cup-shaped nests using grass, fibers and other materials?",
        opts: ["Sparrow", "Ostrich", "Penguin", "Albatross"],
        ans: 0,
        fact: "Sparrows and many other small birds build cup-shaped nests from grasses, fibers and other materials."
    }
];

async function seed() {
    console.log('🌱 Starting question seeding...');

    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('📡 Connected to MongoDB');

        // Replace the existing feed with exactly these 60 questions
        await Question.deleteMany({});
        console.log('🗑️ Cleared existing questions');

        for (let i = 0; i < allQuestions.length; i++) {
            const q = allQuestions[i];

            await Question.create({
                ...q,
                id: i + 1
            });
        }

        console.log(`✅ Seeding complete. ${allQuestions.length} questions added.`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error.message);
        process.exit(1);
    }
}

seed();