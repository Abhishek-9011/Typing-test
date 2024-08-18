const textToType = document.getElementById("text-to-type"); 
const inputText = document.getElementById("input-text");
const timeDisplay = document.getElementById("time");
const wpmDisplay = document.getElementById("wpm");
const restartBtn = document.getElementById("restart-btn");
const twentyWord = document.getElementById("twenty-Word");
const fiftyWord = document.getElementById("fifty-Word");
const hundreadWord = document.getElementById("hundread-Word");

let startTime;
let timer;
let isTyping = false;
let wordLimit;

// Function to generate random test text
function getRandom() {
  return Math.floor(Math.random() * 10);
}

const text = [
  "Coding is a journey of continuous learning. Every challenge faced enhances problem-solving skills, and every bug fixed sharpens the mind. The process of writing, testing, and debugging code is both rewarding and fulfilling. With perseverance and dedication, one can unlock endless opportunities in the world of technology and development.",

  "The vast universe is a reminder of our small place in the cosmos. Stars, planets, and galaxies stretch across unimaginable distances. Yet, in this vastness, life on Earth thrives. Our curiosity drives us to explore, to understand the mysteries of the universe, and to seek our place within it.",

  "Music has the power to evoke emotions and memories. A single melody can transport you to a different time or place. Whether it's a soft lullaby, a powerful symphony, or an energetic beat, music connects us all. It speaks a universal language, transcending boundaries, and uniting people everywhere.",

  "In the heart of the forest, nature's beauty unfolds. Tall trees reach for the sky, while streams flow gently through the landscape. Wildlife thrives in this untouched paradise, living in harmony with the environment. The forest is a sanctuary, a place where one can reconnect with the natural world.",

  "Technology has revolutionized the way we live, work, and communicate. From smartphones to artificial intelligence, advancements continue to shape our daily lives. As we embrace these innovations, it's essential to consider their impact on society. Responsible use of technology can lead to a brighter, more connected future for all.",

  "Traveling opens the mind to new experiences and cultures. Each destination offers unique sights, sounds, and tastes. Meeting people from different backgrounds enriches our understanding of the world. Through travel, we gain a broader perspective, learn to appreciate diversity, and create lasting memories that stay with us forever.",

  "The ocean is a vast and mysterious realm. Beneath the surface lies a world teeming with life, from tiny plankton to massive whales. The ocean's depths hold secrets yet to be discovered. Protecting this vital ecosystem is crucial for the survival of countless species and the health of our planet.",

  "Reading is a gateway to knowledge and imagination. Books transport us to different worlds, introduce us to new ideas, and inspire creativity. Whether it's fiction, non-fiction, or poetry, reading broadens our horizons. In a world filled with distractions, finding time to read can be both rewarding and enriching.",

  "Art is a reflection of human expression and creativity. From paintings to sculptures, art captures the essence of culture and history. It tells stories, conveys emotions, and challenges perceptions. Whether in a gallery, on the streets, or in digital form, art continues to inspire and provoke thought in countless ways.",

  "Healthy living is the foundation of a fulfilling life. A balanced diet, regular exercise, and sufficient sleep are key components. Mental health is equally important, requiring mindfulness and stress management. By prioritizing wellness, we can improve our quality of life and enjoy the benefits of both physical and mental well-being.",
];

const text2 = [
  "Learning to code opens endless opportunities. It builds problem-solving skills and encourages logical thinking, essential in today’s world.",
  "Technology evolves rapidly, and staying updated is crucial. Continuous learning helps professionals adapt to the ever-changing landscape.",
  "Nature’s beauty is all around us. From forests to oceans, every ecosystem plays a vital role in Earth’s balance.",
  "Books are gateways to different worlds. Through reading, we expand our knowledge and imagination, gaining new perspectives on life.",
  "Healthy living involves a balanced diet and regular exercise. Mental health is equally important, requiring mindfulness and care.",
  "Music transcends language, connecting people across cultures. It evokes emotions and memories, bringing joy and comfort universally.",
  "Travel broadens our horizons, exposing us to new cultures and experiences. It fosters understanding and appreciation of diversity.",
  "Art reflects human creativity. It captures moments in history, telling stories that resonate across time and space.",
  "The internet connects the world, making information accessible. However, responsible use is crucial to avoid misinformation and misuse.",
  "Teamwork is essential in achieving goals. Collaboration combines strengths, leading to more innovative solutions and successful outcomes.",
];

const text3 = [
  "In today's fast-paced world, technology has become an integral part of our daily lives. From smartphones to smart homes, technological advancements are shaping the way we communicate, work, and entertain ourselves. The internet connects billions of people globally, providing instant access to information, services, and social networks. However, with these advancements come challenges, such as privacy concerns, cybersecurity threats, and the digital divide. It is essential to navigate this landscape responsibly, ensuring that technology enhances our lives without compromising our security or well-being. As we embrace innovation, let’s strive for a balanced and mindful approach.",

  "Education is the cornerstone of personal and societal growth. It empowers individuals with knowledge, skills, and critical thinking, enabling them to contribute meaningfully to their communities. From early childhood to lifelong learning, education opens doors to opportunities and fosters social mobility. In a rapidly changing world, the need for adaptable and diverse educational systems is more pressing than ever. Emphasizing creativity, problem-solving, and collaboration in the curriculum prepares students for the future workforce. Moreover, equal access to quality education is crucial in bridging socioeconomic gaps and ensuring that everyone has the chance to succeed and thrive.",

  "Environmental conservation is a collective responsibility that we must all take seriously. The planet is facing unprecedented challenges, from climate change to biodiversity loss. Human activities, such as deforestation, pollution, and overconsumption, are driving these crises. However, there is hope. By adopting sustainable practices, reducing our carbon footprint, and protecting natural habitats, we can mitigate the damage and preserve the Earth for future generations. Governments, businesses, and individuals must collaborate to create policies and actions that promote environmental stewardship. Education and awareness are key to inspiring positive change and ensuring a healthier, more sustainable world.",

  "The concept of mental health has gained significant attention in recent years, as society begins to recognize its importance alongside physical health. Mental well-being is essential for leading a fulfilling and productive life. It affects how we think, feel, and act, influencing our relationships, work, and overall quality of life. Unfortunately, mental health issues are often stigmatized, leading to barriers in seeking help. It is crucial to create a supportive environment where individuals feel safe to discuss their struggles and access appropriate care. By raising awareness and promoting mental health resources, we can foster a culture of compassion and understanding.",

  "The power of creativity cannot be underestimated. It drives innovation, solves problems, and enriches our lives with beauty and meaning. Whether through art, music, literature, or scientific discovery, creativity is the force behind human progress. Encouraging creative expression in all its forms is vital for personal growth and societal development. Schools, workplaces, and communities should foster environments that nurture creativity by providing opportunities for exploration and experimentation. In an increasingly automated world, creative thinking remains a uniquely human trait that cannot be replicated by machines. By valuing and supporting creativity, we unlock the potential for a brighter future.",

  "The importance of physical fitness and a healthy lifestyle cannot be overstated. Regular exercise, a balanced diet, and adequate rest are the pillars of physical health. Engaging in physical activities not only strengthens the body but also boosts mental well-being by reducing stress and improving mood. A healthy lifestyle promotes longevity and reduces the risk of chronic diseases such as heart disease, diabetes, and obesity. Moreover, it enhances our ability to perform daily tasks efficiently and enjoy life to the fullest. By making conscious choices to prioritize fitness and health, we invest in a higher quality of life.",

  "Globalization has transformed the world into a more interconnected and interdependent place. The flow of goods, services, information, and people across borders has brought unprecedented opportunities for economic growth, cultural exchange, and innovation. However, globalization also presents challenges, such as income inequality, cultural homogenization, and environmental degradation. It is essential to strike a balance between embracing the benefits of globalization and addressing its negative impacts. By promoting fair trade, protecting cultural diversity, and implementing sustainable practices, we can ensure that globalization serves as a force for good, benefiting all people and preserving the planet for future generations.",

  "The role of technology in healthcare has revolutionized the way we diagnose, treat, and prevent diseases. From telemedicine to electronic health records, technological advancements have improved patient care and increased accessibility to medical services. Innovative treatments, such as gene therapy and personalized medicine, offer new hope for curing previously untreatable conditions. However, the integration of technology in healthcare also raises ethical and privacy concerns, particularly regarding the use of patient data. It is essential to establish robust regulations and safeguards to protect patient rights while continuing to advance medical technology. The future of healthcare depends on balancing innovation with ethical considerations.",

  "Effective communication is the foundation of strong relationships, whether in personal life or the workplace. It involves not only speaking clearly but also listening actively and empathetically. Miscommunication can lead to misunderstandings, conflicts, and missed opportunities. Developing good communication skills is essential for collaboration, problem-solving, and leadership. In the digital age, where interactions increasingly occur online, the nuances of tone and body language can be lost, making effective communication even more challenging. Therefore, it is crucial to cultivate both verbal and non-verbal communication skills, ensuring that messages are conveyed accurately and that all parties feel heard and understood.",

  "Social media has become an integral part of modern life, connecting people across the globe. It offers a platform for self-expression, networking, and staying informed about current events. However, the rise of social media has also brought challenges, such as cyberbullying, misinformation, and the pressure to curate a perfect online image. It is essential to use social media mindfully, recognizing its impact on mental health and well-being. Setting boundaries, practicing digital detox, and engaging in positive online interactions can help mitigate the negative effects. By using social media responsibly, we can harness its potential for good while safeguarding our mental and emotional health.",
];
function totalWordsToType() {
  twentyWord.addEventListener("click", function () {
    wordLimit = text2;
    testGenerator(); // Regenerate text after setting word limit
  });
  
  fiftyWord.addEventListener("click", function () {
    wordLimit = text;
    testGenerator();    
  });
  
  hundreadWord.addEventListener("click", function () {
    wordLimit = text3;
    testGenerator();
  });
}

inputText.addEventListener("input", () => {
  if (!isTyping) {
    isTyping = true;
    startTime = new Date();
    timer = setInterval(updateTime, 1000);
  }

  const typedWords = inputText.value.trim().split(" ");
  const originalWords = textToType.innerText.trim().split(" ");

  let correctWords = 0;
  typedWords.forEach((word, index) => {
    if (word === originalWords[index]) {
      correctWords++;
    }
  });

  const timePassed = Math.floor((new Date() - startTime) / 1000);
  const wpm = Math.floor((correctWords / timePassed) * 60);
  wpmDisplay.innerText = wpm;

  if (inputText.value === textToType.innerText) {
    clearInterval(timer);
  }
});

// Restart button functionality
restartBtn.addEventListener("click", restartTest);

// Updating the time display
function updateTime() {
  const currentTime = new Date();
  const timePassed = Math.floor((currentTime - startTime) / 1000);
  timeDisplay.innerText = timePassed;
}

// Restarting the test
function restartTest() {
  clearInterval(timer);
  inputText.value = "";
  timeDisplay.innerText = "0";
  wpmDisplay.innerText = "0";
  isTyping = false;
  testGenerator();
}

function testGenerator() {
  const randomValue = getRandom();
  if (wordLimit) {
    textToType.innerText = wordLimit[randomValue];
  }
}

// Initialize the word limit selection and generate initial text based on the default word limit
totalWordsToType();
testGenerator();
