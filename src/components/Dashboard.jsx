import React, { useState, useEffect } from "react";
import { getSmartRecommendations } from "../utils/smartScheduler";
import { getUserStats } from "../utils/gamification";
import "./Dashboard.css";

const Dashboard = ({ role }) => {
  const recommendations = getSmartRecommendations();
  const userStats = getUserStats();

  const [selectedCard, setSelectedCard] = useState(null);
  const [taskStatus, setTaskStatus] = useState({ 1: false, 2: false, 3: false });
  const [dailyGoals, setDailyGoals] = useState([
    { id: 1, goal: "✅ Check in to today’s event", completed: false },
    { id: 2, goal: "🙌 Help 2 attendees", completed: false },
    { id: 3, goal: "📸 Share a social media post", completed: false },
  ]);

  const [notifications, setNotifications] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { from: "ai", text: "Hi! How can I help you today?" },
  ]);

  const toggleChat = () => setShowChat(!showChat);

  const handleSend = () => {
    if (chatInput.trim() !== "") {
      setChatMessages((prev) => [
        ...prev,
        { from: "user", text: chatInput.trim() },
        { from: "ai", text: "🤖 I'm still learning. Try again later!" },
      ]);
      setChatInput("");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const randomNotifs = [
        "🆕 New shift available: Food Drive this Friday!",
        "💡 Smart Tip: Join 2 more shifts to level up!",
        "📢 Update: Event location changed for Sunday",
      ];
      const newNotif = randomNotifs[Math.floor(Math.random() * randomNotifs.length)];
      setNotifications((prev) => [...prev, newNotif]);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3600);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const toggleTask = (id) => setTaskStatus((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleDailyGoal = (id) =>
    setDailyGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );

  const leaderboard = [
    { name: "Khushboo", points: 320 },
    { name: "Rahul", points: 275 },
    { name: "Neha", points: 260 },
  ];

  const badges = [
    { id: 1, name: "Night Owl 🌙", description: "Volunteered in night shifts", earned: true },
    { id: 2, name: "Team Leader 👑", description: "Led a volunteer team", earned: true },
    { id: 3, name: "First Event 🎉", description: "Completed your first event", earned: true },
    { id: 4, name: "100 XP 🔥", description: "Earned 100 XP", earned: false },
  ];

  const getContentForCard = (card) => {
    switch (card) {
      case "Manage Events":
        return (
          <div>
            <h3>🗓️ Manage Events</h3>
            <button className="action-btn">Create New Event</button>
            <p>You can create, edit, or delete your events here.</p>
          </div>
        );
      case "View Volunteers":
        return (
          <div>
            <h3>👥 Volunteer Overview</h3>
            <ul>
              <li>Volunteer 1 - ✅ Available</li>
              <li>Volunteer 2 - 🔄 Assigned</li>
              <li>Volunteer 3 - ✅ Available</li>
            </ul>
          </div>
        );
      case "Post Announcements":
        return (
          <div>
            <h3>📢 New Announcement</h3>
            <textarea placeholder="Type announcement..." rows="4" />
            <button className="action-btn">Post</button>
          </div>
        );
      case "View Reports":
        return (
          <div>
            <h3>📊 Event Reports</h3>
            <p>Attendance: 93%<br />Feedback: ⭐ 4.5/5<br />Engagement: 87%</p>
          </div>
        );
      case "My Shifts":
        return (
          <div>
            <h3>🕒 Your Upcoming Shifts</h3>
            <ul>
              <li>📍 Beach Cleanup – 22 July, 10–1 PM</li>
              <li>📍 Teaching Program – 24 July, 3–6 PM</li>
              <li>📍 Tree Plantation – 27 July, 9–12 PM</li>
            </ul>
          </div>
        );
      case "Smart Suggestions":
        return (
          <div>
            <h3>💡 Personalized Tips</h3>
            <ul>
              <li>📸 Upload event photos for more points</li>
              <li>📝 Write event summary for a badge</li>
              <li>🤝 Refer friends and earn +50 points</li>
              <li>📅 Complete 3+ shifts to level up</li>
            </ul>
          </div>
        );
      case "Announcements":
        return (
          <div>
            <h3>📢 Announcements</h3>
            <ul>
              <li>⚠️ Venue change for Sunday event</li>
              <li>🗓️ Update your shift availability</li>
            </ul>
          </div>
        );
      case "Progress": {
        const tasks = [
          { id: 1, title: "Attend Orientation", completed: taskStatus[1] },
          { id: 2, title: "Submit Availability", completed: taskStatus[2] },
          { id: 3, title: "Join First Event", completed: taskStatus[3] },
        ];
        const completed = tasks.filter((task) => task.completed).length;
        const progress = Math.round((completed / tasks.length) * 100);

        return (
          <div>
            <h3>🎮 Progress Tracker</h3>
            <p>{userStats.name} — Level {userStats.level}</p>
            <div className="progress-bar neon">
              <div className="progress-fill" style={{ width: `${progress}%` }}>
                {progress}%
              </div>
            </div>
            <ul>
              {tasks.map((task) => (
                <li key={task.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                    />
                    {task.title}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        );
      }
      case "Daily Goals":
        return (
          <div>
            <h3>🌟 Daily Goals</h3>
            <ul>
              {dailyGoals.map((goal) => (
                <li key={goal.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={goal.completed}
                      onChange={() => toggleDailyGoal(goal.id)}
                    />
                    {goal.goal}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        );
      case "Leaderboard":
        return (
          <div>
            <h3>🥇 Leaderboard</h3>
            <ol>
              {leaderboard.map((user, i) => (
                <li key={i}>{i + 1}. {user.name} – {user.points} pts</li>
              ))}
            </ol>
          </div>
        );
      case "Hackathon Wins":
        return (
          <div>
            <h3>🏆 Hackathon Achievements</h3>
            <ul>
              <li>Smart India Hackathon – 🥇 Winner</li>
              <li>LPU CodeStorm – 🏁 Finalist</li>
              <li>DevConnect 2024 – 🎨 Best UI</li>
            </ul>
          </div>
        );
      case "My Certificates":
        return (
          <div>
            <h3>📄 Certifications</h3>
            <ul>
              <li>Web Dev – Coursera ✅</li>
              <li>Python – Udemy ✅</li>
              <li>Data Bootcamp – LPU 👩‍💻</li>
            </ul>
          </div>
        );
      case "My Badges":
        return (
          <div className="badge-container">
            <h3>🏅 Your Badges</h3>
            <div className="badge-list">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`badge-card ${badge.earned ? "earned" : "locked"}`}
                >
                  <div className="badge-icon">{badge.name.split(" ")[1]}</div>
                  <div className="badge-info">
                    <p className="badge-name">{badge.name}</p>
                    <p className="badge-desc">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "Impact Tracker":
        return (
          <div className="impact-tracker">
            <h2>🌍 Your Impact Tracker</h2>
            <div className="impact-grid">
              <div className="impact-card"><h3>⏱ Hours Volunteered</h3><p>46 hrs</p></div>
              <div className="impact-card"><h3>🤝 People Helped</h3><p>210</p></div>
              <div className="impact-card"><h3>🌳 Trees Planted</h3><p>37</p></div>
              <div className="impact-card"><h3>🥣 Meals Served</h3><p>85</p></div>
              <div className="impact-card"><h3>💨 CO₂ Saved</h3><p>18 kg</p></div>
            </div>
            <div className="impact-timeline">
              <h3>📅 Your Contribution Timeline</h3>
              <ul>
                <li>🗓️ July 1 – Tree Plantation Drive 🌳 (5 hrs)</li>
                <li>🗓️ July 6 – Meal Distribution 🥣 (3 hrs)</li>
                <li>🗓️ July 12 – Teaching Kids 📚 (4 hrs)</li>
              </ul>
            </div>
          </div>
        );
      case "Journey Timeline":
        const timeline = [
  {
    date: "📅 Jan 2025",
    title: "Joined CrewSync",
    desc: "Welcome aboard! You took your first step towards meaningful impact. 🎉",
  },
  {
    date: "🎈 Feb 2025",
    title: "First Event Completed",
    desc: "You participated in your very first event — helping plant 20 trees with GreenEarth 🌱",
  },
  {
    date: "⏳ Mar 2025",
    title: "50 Volunteer Hours Reached",
    desc: "Dedication rewarded! You've crossed the 50-hour milestone. Keep it going! 💪",
  },
  {
    date: "🏅 Apr 2025",
    title: "Earned 'Community Hero' Badge",
    desc: "Your efforts didn’t go unnoticed — you received the Community Hero badge. 🦸‍♂️",
  },
  {
    date: "🌟 May 2025",
    title: "Led Your First Team",
    desc: "Leadership unlocked! You led a group of 10 volunteers in an education drive. 📚",
  },
];
        return (
           <div className="journey-timeline">
    <h3>🕸️ Your Volunteer Journey</h3>

    <p className="timeline-intro">
      Every step you’ve taken, every event you’ve joined — it's all part of a journey that defines your impact. 
      Here's a quick glance at how far you've come with CrewSync. ✨
    </p>

    <div className="timeline-scroll">
      {timeline.map((event, idx) => (
        <div key={idx} className="timeline-card">
          <p className="timeline-date">{event.date}</p>
          <h4>{event.title}</h4>
          <p>{event.desc}</p>
        </div>
      ))}
    </div>
  </div>
        );
      default:
        return <p>Select a card to view content.</p>;
    }
  };

  const cards = role === "organizer"
    ? ["Manage Events", "View Volunteers", "Post Announcements", "View Reports", "Leaderboard", "Hackathon Wins", "My Certificates", "My Badges", "Impact Tracker", "Journey Timeline"]
    : ["My Shifts", "Smart Suggestions", "Announcements", "Progress", "Daily Goals", "Leaderboard", "Hackathon Wins", "My Certificates", "My Badges", "Impact Tracker", "Journey Timeline"];

  const cardIcons = {
    "Manage Events": "🗓️ Manage Events",
    "View Volunteers": "👥 View Volunteers",
    "Post Announcements": "📢 Post Announcements",
    "View Reports": "📊 View Reports",
    "My Shifts": "🕒 My Shifts",
    "Smart Suggestions": "🧠 Smart Suggestions",
    "Announcements": "📢 Announcements",
    "Progress": "🎮 Progress",
    "Daily Goals": "🌟 Daily Goals",
    "Leaderboard": "🥇 Leaderboard",
    "Hackathon Wins": "🏆 Hackathon Wins",
    "My Certificates": "📄 My Certificates",
    "My Badges": "🎖️ My Badges",
    "Impact Tracker": "🌍 Impact Tracker",
    "Journey Timeline": "🕸️ Journey Timeline",
  };

  return (
    <div className={`dashboard-container ${role}`}>
      <header className="dashboard-header">
        <h2>{role === "organizer" ? "🎯 Organizer Dashboard" : "🙋 Volunteer Dashboard"}</h2>
      </header>

      <section className="cards-section">
        {cards.map((cardName) => (
          <div
            key={cardName}
            className={`card neon-border ${selectedCard === cardName ? "active" : ""}`}
            onClick={() => setSelectedCard(cardName)}
          >
            {cardIcons[cardName]}
          </div>
        ))}
      </section>

      <section className="info-section glass">
        {getContentForCard(selectedCard)}
      </section>

      {showToast && notifications.length > 0 && (
        <div className="toast-notification">
          {notifications[notifications.length - 1]}
        </div>
      )}

      <div className="floating-chat-bubble" onClick={toggleChat}>💬</div>

      {showChat && (
        <div className="chat-box">
          <div className="chat-box-header">AI Assistant</div>
          <div className="chat-box-body">
            {chatMessages.map((msg, index) => (
              <div key={index} style={{ textAlign: msg.from === "user" ? "right" : "left", marginBottom: "10px" }}>
                <span>{msg.text}</span>
              </div>
            ))}
          </div>
          <div className="chat-box-input">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
