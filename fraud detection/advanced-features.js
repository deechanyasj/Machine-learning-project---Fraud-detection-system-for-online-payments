// Advanced Interactive Features for Fraud Detection System

// Dashboard Tab Management
function showTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = 'none';
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab and mark button as active
    document.getElementById(tabName + '-tab').style.display = 'block';
    event.target.classList.add('active');
    
    // Initialize tab-specific content
    initializeTabContent(tabName);
}

function initializeTabContent(tabName) {
    switch(tabName) {
        case 'realtime':
            initializeCharts();
            break;
        case 'ml':
            updateMLMetrics();
            break;
        case 'threats':
            startThreatFeed();
            break;
        case 'network':
            generateNetworkGraph();
            break;
        case 'blockchain':
            initializeBlockchainAnalysis();
            break;
    }
}

// Real-time Charts and Analytics
function initializeCharts() {
    updateVelocityChart();
    updateAmountChart();
    generateRiskMap();
    generateTimeHeatmap();
}

function updateVelocityChart() {
    const canvas = document.getElementById('velocityChart');
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Generate sample data
    const data = [];
    for (let i = 0; i < 24; i++) {
        data.push(Math.floor(Math.random() * 100) + 20);
    }
    
    // Draw chart
    const maxValue = Math.max(...data);
    const barWidth = canvas.width / data.length;
    
    ctx.fillStyle = '#667eea';
    data.forEach((value, index) => {
        const barHeight = (value / maxValue) * (canvas.height - 20);
        ctx.fillRect(index * barWidth, canvas.height - barHeight, barWidth - 2, barHeight);
    });
    
    // Add labels
    ctx.fillStyle = '#333';
    ctx.font = '10px Arial';
    ctx.fillText('Transaction Velocity (24h)', 10, 15);
}

function updateAmountChart() {
    const canvas = document.getElementById('amountChart');
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Generate distribution data
    const ranges = ['$0-100', '$100-500', '$500-1K', '$1K-5K', '$5K+'];
    const values = [45, 30, 15, 8, 2];
    
    let currentAngle = 0;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 60;
    
    const colors = ['#2ed573', '#ffa502', '#ff6348', '#ff4757', '#8e44ad'];
    
    values.forEach((value, index) => {
        const sliceAngle = (value / 100) * 2 * Math.PI;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = colors[index];
        ctx.fill();
        
        currentAngle += sliceAngle;
    });
}

function generateRiskMap() {
    const mapContainer = document.getElementById('riskMap');
    mapContainer.innerHTML = '';
    
    // Create risk indicators for different regions
    const regions = [
        { name: 'North America', risk: 'low', x: 20, y: 30 },
        { name: 'Europe', risk: 'medium', x: 50, y: 25 },
        { name: 'Asia', risk: 'high', x: 75, y: 40 },
        { name: 'South America', risk: 'medium', x: 30, y: 70 },
        { name: 'Africa', risk: 'high', x: 55, y: 60 }
    ];
    
    regions.forEach(region => {
        const indicator = document.createElement('div');
        indicator.style.position = 'absolute';
        indicator.style.left = region.x + '%';
        indicator.style.top = region.y + '%';
        indicator.style.width = '15px';
        indicator.style.height = '15px';
        indicator.style.borderRadius = '50%';
        indicator.style.cursor = 'pointer';
        indicator.title = `${region.name}: ${region.risk} risk`;
        
        switch(region.risk) {
            case 'high':
                indicator.style.background = '#ff4757';
                break;
            case 'medium':
                indicator.style.background = '#ffa502';
                break;
            case 'low':
                indicator.style.background = '#2ed573';
                break;
        }
        
        mapContainer.appendChild(indicator);
    });
}

function generateTimeHeatmap() {
    const container = document.getElementById('timePatterns');
    container.innerHTML = '';
    
    // Create 24-hour heatmap
    for (let hour = 0; hour < 24; hour++) {
        const cell = document.createElement('div');
        cell.style.display = 'inline-block';
        cell.style.width = '4%';
        cell.style.height = '100%';
        cell.style.margin = '0 1px';
        cell.style.cursor = 'pointer';
        cell.title = `${hour}:00 - Risk Level`;
        
        // Simulate risk levels based on time
        let riskLevel;
        if (hour >= 2 && hour <= 6) {
            riskLevel = 'high'; // Late night/early morning
            cell.style.background = '#ff4757';
        } else if (hour >= 22 || hour <= 1) {
            riskLevel = 'medium'; // Late evening
            cell.style.background = '#ffa502';
        } else {
            riskLevel = 'low'; // Normal hours
            cell.style.background = '#2ed573';
        }
        
        container.appendChild(cell);
    }
}

// ML Model Management
function updateMLMetrics() {
    // Simulate real-time model performance updates
    setInterval(() => {
        document.getElementById('lr-accuracy').textContent = (94 + Math.random() * 2).toFixed(1) + '%';
        document.getElementById('lr-precision').textContent = (92 + Math.random() * 3).toFixed(1) + '%';
        document.getElementById('lr-recall').textContent = (95 + Math.random() * 2).toFixed(1) + '%';
        document.getElementById('lr-f1').textContent = (93 + Math.random() * 2).toFixed(1) + '%';
        
        document.getElementById('ae-anomaly').textContent = (88 + Math.random() * 4).toFixed(1) + '%';
        document.getElementById('ae-error').textContent = (0.02 + Math.random() * 0.01).toFixed(3);
        
        document.getElementById('rf-accuracy').textContent = (95 + Math.random() * 2).toFixed(1) + '%';
    }, 5000);
}

function retrainModel(modelType) {
    const button = event.target;
    const originalText = button.textContent;
    
    button.textContent = 'Retraining...';
    button.disabled = true;
    
    // Simulate model retraining
    setTimeout(() => {
        button.textContent = 'Retrained Successfully!';
        button.style.background = '#2ed573';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '#00ff88';
            button.disabled = false;
        }, 2000);
    }, 3000);
    
    showDemo(`${modelType} Model Retraining`, `
        <div class="demo-content">
            <h4>🤖 Retraining ${modelType} Model</h4>
            <div class="progress-bar"><div class="progress-fill" style="width: 100%"></div></div>
            <div class="metric-display">
                <div class="metric-card">
                    <div class="metric-value">10,000</div>
                    <div class="metric-label">Training Samples</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">50</div>
                    <div class="metric-label">Epochs</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">97.2%</div>
                    <div class="metric-label">New Accuracy</div>
                </div>
            </div>
            <p><strong>Status:</strong> Model successfully retrained with improved accuracy and updated fraud patterns.</p>
        </div>
    `);
}

// Threat Intelligence
function startThreatFeed() {
    const feedContainer = document.getElementById('threatFeed');
    
    const threats = [
        'New botnet detected targeting financial institutions',
        'Phishing campaign using fake banking emails',
        'Credential stuffing attacks on payment platforms',
        'Malware targeting mobile banking apps',
        'Social engineering attacks via phone calls',
        'Fake merchant websites collecting card data',
        'SIM swapping attacks increasing in frequency',
        'Ransomware targeting payment processors'
    ];
    
    setInterval(() => {
        const threat = threats[Math.floor(Math.random() * threats.length)];
        const threatItem = document.createElement('div');
        threatItem.className = 'threat-item';
        threatItem.innerHTML = `
            <div style="font-size: 0.8rem; opacity: 0.7;">${new Date().toLocaleTimeString()}</div>
            <div>${threat}</div>
        `;
        
        feedContainer.insertBefore(threatItem, feedContainer.firstChild);
        
        // Keep only last 10 items
        while (feedContainer.children.length > 10) {
            feedContainer.removeChild(feedContainer.lastChild);
        }
    }, 3000);
}

function checkIPReputation() {
    const ip = document.getElementById('ipInput').value;
    const resultsDiv = document.getElementById('ipResults');
    
    if (!ip) {
        alert('Please enter an IP address');
        return;
    }
    
    resultsDiv.innerHTML = '<div>Checking IP reputation...</div>';
    
    setTimeout(() => {
        const riskScore = Math.floor(Math.random() * 100);
        let riskLevel, color;
        
        if (riskScore > 70) {
            riskLevel = 'HIGH RISK';
            color = '#ff4757';
        } else if (riskScore > 40) {
            riskLevel = 'MEDIUM RISK';
            color = '#ffa502';
        } else {
            riskLevel = 'LOW RISK';
            color = '#2ed573';
        }
        
        resultsDiv.innerHTML = `
            <div style="margin-top: 1rem; padding: 1rem; border-radius: 8px; background: ${color}; color: white;">
                <strong>IP: ${ip}</strong><br>
                Risk Level: ${riskLevel}<br>
                Risk Score: ${riskScore}/100<br>
                Location: ${['USA', 'Russia', 'China', 'Germany', 'Brazil'][Math.floor(Math.random() * 5)]}<br>
                ISP: ${['Suspicious VPN', 'Residential', 'Corporate', 'Mobile'][Math.floor(Math.random() * 4)]}
            </div>
        `;
    }, 2000);
}

// Network Analysis
function generateNetworkGraph() {
    const container = document.getElementById('networkViz');
    container.innerHTML = '';
    
    // Create nodes and connections
    const nodes = [
        { id: 'user1', x: 50, y: 50, suspicious: false },
        { id: 'user2', x: 150, y: 100, suspicious: true },
        { id: 'merchant1', x: 250, y: 75, suspicious: false },
        { id: 'merchant2', x: 200, y: 150, suspicious: true },
        { id: 'bank', x: 100, y: 200, suspicious: false }
    ];
    
    const connections = [
        { from: 0, to: 2, suspicious: false },
        { from: 1, to: 3, suspicious: true },
        { from: 0, to: 4, suspicious: false },
        { from: 1, to: 4, suspicious: true }
    ];
    
    // Draw connections first
    connections.forEach(conn => {
        const line = document.createElement('div');
        line.className = 'network-connection';
        if (conn.suspicious) line.classList.add('suspicious-connection');
        
        const fromNode = nodes[conn.from];
        const toNode = nodes[conn.to];
        
        const dx = toNode.x - fromNode.x;
        const dy = toNode.y - fromNode.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        
        line.style.left = fromNode.x + 'px';
        line.style.top = fromNode.y + 'px';
        line.style.width = length + 'px';
        line.style.transform = `rotate(${angle}deg)`;
        
        container.appendChild(line);
    });
    
    // Draw nodes
    nodes.forEach((node, index) => {
        const nodeEl = document.createElement('div');
        nodeEl.className = 'network-node';
        nodeEl.style.left = node.x + 'px';
        nodeEl.style.top = node.y + 'px';
        nodeEl.title = node.id;
        
        if (node.suspicious) {
            nodeEl.style.background = '#ff4757';
        }
        
        nodeEl.onclick = () => {
            document.getElementById('connectionResults').innerHTML = `
                <h5>Node Analysis: ${node.id}</h5>
                <p>Status: ${node.suspicious ? 'Suspicious' : 'Normal'}</p>
                <p>Connections: ${connections.filter(c => c.from === index || c.to === index).length}</p>
                <p>Risk Score: ${node.suspicious ? '85/100' : '15/100'}</p>
            `;
        };
        
        container.appendChild(nodeEl);
    });
}

// Blockchain Analysis
function initializeBlockchainAnalysis() {
    document.getElementById('blacklistStatus').innerHTML = `
        <div style="padding: 1rem; background: #f8f9fa; border-radius: 8px; margin-top: 1rem;">
            <h5>Blacklist Status</h5>
            <p>✅ No matches found in known fraud databases</p>
            <p>📊 Monitoring 15,000+ blacklisted addresses</p>
            <p>🔄 Last updated: ${new Date().toLocaleString()}</p>
        </div>
    `;
}

function analyzeWallet() {
    const wallet = document.getElementById('walletInput').value;
    const resultsDiv = document.getElementById('walletResults');
    
    if (!wallet) {
        alert('Please enter a wallet address');
        return;
    }
    
    resultsDiv.innerHTML = '<div>Analyzing wallet...</div>';
    
    setTimeout(() => {
        const riskFactors = Math.floor(Math.random() * 5);
        const balance = (Math.random() * 1000).toFixed(2);
        
        resultsDiv.innerHTML = `
            <div style="margin-top: 1rem; padding: 1rem; background: rgba(255,255,255,0.2); border-radius: 8px;">
                <strong>Wallet Analysis</strong><br>
                Address: ${wallet.substring(0, 10)}...<br>
                Balance: ${balance} BTC<br>
                Risk Factors: ${riskFactors}<br>
                Status: ${riskFactors > 2 ? 'HIGH RISK' : 'NORMAL'}<br>
                Transactions: ${Math.floor(Math.random() * 1000)}
            </div>
        `;
        
        document.getElementById('tracingResults').innerHTML = `
            <div style="padding: 1rem; background: #2c3e50; color: white; border-radius: 8px;">
                <h5>Transaction Trace</h5>
                <div style="font-family: monospace; font-size: 0.8rem;">
                    ${wallet} → 1A2B3C... → 4D5E6F...<br>
                    Amount: ${balance} BTC<br>
                    Hops: ${Math.floor(Math.random() * 5) + 1}<br>
                    Mixing Service: ${Math.random() > 0.5 ? 'Detected' : 'None'}
                </div>
            </div>
        `;
    }, 2000);
}

// Advanced Biometric Features
function simulateBiometricAuth() {
    showDemo('Biometric Authentication Analysis', `
        <div class="demo-content">
            <h4>🔍 Multi-Modal Biometric Verification</h4>
            <div class="progress-bar"><div class="progress-fill" style="width: 92%"></div></div>
            <div class="metric-display">
                <div class="metric-card">
                    <div class="metric-value">98.7%</div>
                    <div class="metric-label">Fingerprint Match</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">FAIL</div>
                    <div class="metric-label">Face Recognition</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">94.2%</div>
                    <div class="metric-label">Voice Pattern</div>
                </div>
            </div>
            <p><strong>Alert:</strong> Biometric mismatch detected. Fingerprint matches but facial recognition failed. Possible identity theft attempt.</p>
        </div>
    `);
}

function simulateVoiceAnalysis() {
    showDemo('Voice Pattern Analysis', `
        <div class="demo-content">
            <h4>🎤 Advanced Voice Biometrics</h4>
            <div class="progress-bar"><div class="progress-fill" style="width: 87%"></div></div>
            <div class="metric-display">
                <div class="metric-card">
                    <div class="metric-value">2.3 kHz</div>
                    <div class="metric-label">Fundamental Frequency</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">STRESS</div>
                    <div class="metric-label">Emotional State</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">73%</div>
                    <div class="metric-label">Confidence Score</div>
                </div>
            </div>
            <p><strong>Analysis:</strong> Voice patterns indicate stress and nervousness. Spectral analysis shows deviation from baseline voice profile.</p>
        </div>
    `);
}

function simulateKeystrokeDynamics() {
    showDemo('Keystroke Dynamics Analysis', `
        <div class="demo-content">
            <h4>⌨️ Behavioral Keystroke Analysis</h4>
            <div class="progress-bar"><div class="progress-fill" style="width: 95%"></div></div>
            <div class="metric-display">
                <div class="metric-card">
                    <div class="metric-value">127ms</div>
                    <div class="metric-label">Avg Dwell Time</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">89ms</div>
                    <div class="metric-label">Flight Time</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">ANOMALY</div>
                    <div class="metric-label">Pattern Status</div>
                </div>
            </div>
            <p><strong>Detection:</strong> Keystroke rhythm significantly different from user's historical pattern. Possible account takeover or automated bot activity.</p>
        </div>
    `);
}

function simulateAIThreatHunting() {
    showDemo('AI-Powered Threat Hunting', `
        <div class="demo-content">
            <h4>🎯 Autonomous Threat Detection</h4>
            <div class="progress-bar"><div class="progress-fill" style="width: 98%"></div></div>
            <div class="metric-display">
                <div class="metric-card">
                    <div class="metric-value">47</div>
                    <div class="metric-label">Threats Identified</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">12</div>
                    <div class="metric-label">Zero-Day Patterns</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">99.1%</div>
                    <div class="metric-label">AI Confidence</div>
                </div>
            </div>
            <p><strong>AI Analysis:</strong> Advanced neural networks detected 12 previously unknown fraud patterns. Automated response protocols activated.</p>
        </div>
    `);
}

// AI Chat Assistant
function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    const chatMessages = document.getElementById('chatMessages');
    
    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-message user';
    userMsg.textContent = message;
    chatMessages.appendChild(userMsg);
    
    input.value = '';
    
    // Simulate AI response
    setTimeout(() => {
        const aiMsg = document.createElement('div');
        aiMsg.className = 'chat-message ai';
        aiMsg.textContent = generateAIResponse(message);
        chatMessages.appendChild(aiMsg);
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
}

function generateAIResponse(message) {
    const responses = {
        'risk': 'Based on current patterns, high-risk indicators include unusual transaction times, new devices, and geographic anomalies.',
        'pattern': 'I\'ve identified 3 new fraud patterns this week: rapid micro-transactions, location spoofing, and synthetic identity creation.',
        'recommendation': 'I recommend implementing additional 2FA for transactions over $1000 and enhanced device fingerprinting.',
        'threat': 'Current threat level is MEDIUM. Monitoring 15 active campaigns targeting financial institutions.',
        'model': 'Our ML models show 96.2% accuracy. The Random Forest ensemble is performing best for current fraud types.',
        'default': 'I can help you analyze fraud patterns, assess risks, and provide security recommendations. What specific area interests you?'
    };
    
    const lowerMessage = message.toLowerCase();
    
    for (const [key, response] of Object.entries(responses)) {
        if (lowerMessage.includes(key)) {
            return response;
        }
    }
    
    return responses.default;
}

// Initialize advanced features when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Start real-time updates
    updateMLMetrics();
    
    // Initialize first tab
    showTab('realtime');
    
    // Add chat input event listener
    document.getElementById('chatInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });
    
    // Add welcome message to chat
    setTimeout(() => {
        const chatMessages = document.getElementById('chatMessages');
        const welcomeMsg = document.createElement('div');
        welcomeMsg.className = 'chat-message ai';
        welcomeMsg.textContent = '🤖 Hello! I\'m your AI Fraud Assistant. Ask me about risk patterns, threat intelligence, or security recommendations.';
        chatMessages.appendChild(welcomeMsg);
    }, 1000);
});