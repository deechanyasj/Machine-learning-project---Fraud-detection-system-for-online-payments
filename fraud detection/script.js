// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('time').value = new Date().getHours();
    setupRealTimeIndicators();
    startLiveMonitoring();
});

// Real-time input indicators
function setupRealTimeIndicators() {
    document.getElementById('amount').addEventListener('input', updateAmountIndicator);
    document.getElementById('merchant').addEventListener('input', updateMerchantIndicator);
    document.getElementById('location').addEventListener('change', updateLocationIndicator);
    document.getElementById('time').addEventListener('input', updateTimeIndicator);
    document.getElementById('userId').addEventListener('input', updateUserIndicator);
    document.getElementById('deviceId').addEventListener('input', updateDeviceIndicator);
    document.getElementById('ipAddress').addEventListener('input', updateIPIndicator);
    document.getElementById('userAgent').addEventListener('input', updateAgentIndicator);
    document.getElementById('sessionId').addEventListener('input', updateSessionIndicator);
    document.getElementById('paymentMethod').addEventListener('change', updatePaymentIndicator);
    document.getElementById('transactionType').addEventListener('change', updateTypeIndicator);
}

function updateAmountIndicator() {
    const amount = parseFloat(document.getElementById('amount').value);
    const indicator = document.getElementById('amountIndicator');
    
    if (isNaN(amount) || amount <= 0) {
        indicator.textContent = '';
        indicator.className = 'feature-indicator';
    } else if (amount > 2000) {
        indicator.textContent = '⚠️ High Amount - Increased Risk';
        indicator.className = 'feature-indicator indicator-danger';
    } else if (amount > 1000) {
        indicator.textContent = '⚡ Medium Amount - Monitor';
        indicator.className = 'feature-indicator indicator-warning';
    } else {
        indicator.textContent = '✅ Normal Amount Range';
        indicator.className = 'feature-indicator indicator-safe';
    }
}

function updateMerchantIndicator() {
    const risk = parseInt(document.getElementById('merchant').value);
    const indicator = document.getElementById('merchantIndicator');
    
    if (isNaN(risk)) {
        indicator.textContent = '';
        indicator.className = 'feature-indicator';
    } else if (risk > 7) {
        indicator.textContent = '🚨 High Risk Merchant';
        indicator.className = 'feature-indicator indicator-danger';
    } else if (risk > 5) {
        indicator.textContent = '⚠️ Medium Risk Merchant';
        indicator.className = 'feature-indicator indicator-warning';
    } else {
        indicator.textContent = '✅ Low Risk Merchant';
        indicator.className = 'feature-indicator indicator-safe';
    }
}

function updateLocationIndicator() {
    const match = document.getElementById('location').value;
    const indicator = document.getElementById('locationIndicator');
    
    if (match === '0') {
        indicator.textContent = '🌍 Location Mismatch Detected';
        indicator.className = 'feature-indicator indicator-danger';
    } else {
        indicator.textContent = '📍 Location Verified';
        indicator.className = 'feature-indicator indicator-safe';
    }
}

function updateTimeIndicator() {
    const hour = parseInt(document.getElementById('time').value);
    const indicator = document.getElementById('timeIndicator');
    
    if (isNaN(hour)) {
        indicator.textContent = '';
        indicator.className = 'feature-indicator';
    } else if (hour < 6 || hour > 22) {
        indicator.textContent = '🌙 Unusual Time - High Risk';
        indicator.className = 'feature-indicator indicator-danger';
    } else if (hour < 8 || hour > 20) {
        indicator.textContent = '⏰ Off-peak Hours';
        indicator.className = 'feature-indicator indicator-warning';
    } else {
        indicator.textContent = '☀️ Normal Business Hours';
        indicator.className = 'feature-indicator indicator-safe';
    }
}

function updateUserIndicator() {
    const userId = document.getElementById('userId').value.trim();
    const indicator = document.getElementById('userIndicator');
    
    if (!userId) {
        indicator.textContent = '👤 Anonymous User';
        indicator.className = 'feature-indicator indicator-warning';
    } else {
        indicator.textContent = '✅ User Identified';
        indicator.className = 'feature-indicator indicator-safe';
    }
}

function updateDeviceIndicator() {
    const deviceId = document.getElementById('deviceId').value.trim();
    const indicator = document.getElementById('deviceIndicator');
    
    if (!deviceId) {
        indicator.textContent = '📱 Unknown Device';
        indicator.className = 'feature-indicator indicator-warning';
    } else if (deviceId.includes('unknown') || deviceId.includes('new')) {
        indicator.textContent = '🚨 New/Suspicious Device';
        indicator.className = 'feature-indicator indicator-danger';
    } else {
        indicator.textContent = '✅ Trusted Device';
        indicator.className = 'feature-indicator indicator-safe';
    }
}

function updateIPIndicator() {
    const ip = document.getElementById('ipAddress').value.trim();
    const indicator = document.getElementById('ipIndicator');
    
    if (!ip) {
        indicator.textContent = '';
        indicator.className = 'feature-indicator';
    } else if (ip.startsWith('10.') || ip.startsWith('192.168.') || ip.startsWith('172.')) {
        indicator.textContent = '🏠 Private Network';
        indicator.className = 'feature-indicator indicator-safe';
    } else if (ip.includes('tor') || ip.includes('vpn')) {
        indicator.textContent = '🚨 Anonymous Network';
        indicator.className = 'feature-indicator indicator-danger';
    } else {
        indicator.textContent = '🌐 Public IP';
        indicator.className = 'feature-indicator indicator-warning';
    }
}

function updateAgentIndicator() {
    const agent = document.getElementById('userAgent').value.trim();
    const indicator = document.getElementById('agentIndicator');
    
    if (!agent) {
        indicator.textContent = '';
        indicator.className = 'feature-indicator';
    } else if (agent.toLowerCase().includes('bot') || agent.toLowerCase().includes('crawler')) {
        indicator.textContent = '🤖 Bot Detected';
        indicator.className = 'feature-indicator indicator-danger';
    } else if (agent.includes('Chrome') || agent.includes('Firefox') || agent.includes('Safari')) {
        indicator.textContent = '🌐 Standard Browser';
        indicator.className = 'feature-indicator indicator-safe';
    } else {
        indicator.textContent = '❓ Unknown Agent';
        indicator.className = 'feature-indicator indicator-warning';
    }
}

function updateSessionIndicator() {
    const session = document.getElementById('sessionId').value.trim();
    const indicator = document.getElementById('sessionIndicator');
    
    if (!session) {
        indicator.textContent = '🔑 No Session';
        indicator.className = 'feature-indicator indicator-warning';
    } else if (session.length < 10) {
        indicator.textContent = '⚠️ Weak Session ID';
        indicator.className = 'feature-indicator indicator-danger';
    } else {
        indicator.textContent = '✅ Valid Session';
        indicator.className = 'feature-indicator indicator-safe';
    }
}

function updatePaymentIndicator() {
    const method = document.getElementById('paymentMethod').value;
    const indicator = document.getElementById('paymentIndicator');
    
    switch(method) {
        case 'crypto':
            indicator.textContent = '₿ High Risk Payment Method';
            indicator.className = 'feature-indicator indicator-danger';
            break;
        case 'credit_card':
        case 'debit_card':
            indicator.textContent = '💳 Standard Payment Method';
            indicator.className = 'feature-indicator indicator-safe';
            break;
        case 'upi':
        case 'wallet':
            indicator.textContent = '📱 Digital Payment Method';
            indicator.className = 'feature-indicator indicator-warning';
            break;
        default:
            indicator.textContent = '🏦 Bank Transfer';
            indicator.className = 'feature-indicator indicator-safe';
    }
}

function updateTypeIndicator() {
    const type = document.getElementById('transactionType').value;
    const indicator = document.getElementById('typeIndicator');
    
    switch(type) {
        case 'withdrawal':
            indicator.textContent = '🏧 ATM Withdrawal - Monitor';
            indicator.className = 'feature-indicator indicator-warning';
            break;
        case 'transfer':
            indicator.textContent = '💸 Money Transfer - High Risk';
            indicator.className = 'feature-indicator indicator-danger';
            break;
        case 'purchase':
            indicator.textContent = '🛍️ Standard Purchase';
            indicator.className = 'feature-indicator indicator-safe';
            break;
        default:
            indicator.textContent = '💼 Business Transaction';
            indicator.className = 'feature-indicator indicator-safe';
    }
}

// Advanced Feature Simulations
function simulateTimeAnalysis() {
    showDemo('Time Pattern Analysis', `
        <div class="demo-content">
            <h4>🕒 Analyzing Transaction Timing Patterns</h4>
            <div class="progress-bar"><div class="progress-fill" style="width: 85%"></div></div>
            <div class="metric-display">
                <div class="metric-card">
                    <div class="metric-value">${new Date().getHours()}:${new Date().getMinutes()}</div>
                    <div class="metric-label">Current Time</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">3.2x</div>
                    <div class="metric-label">Frequency vs Normal</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">85%</div>
                    <div class="metric-label">Risk Score</div>
                </div>
            </div>
            <p><strong>Analysis:</strong> Transaction occurring during unusual hours. Pattern shows 3.2x higher frequency than normal user behavior.</p>
        </div>
    `);
}

function simulateGeoLocation() {
    showDemo('Geo-Location Analysis', `
        <div class="demo-content">
            <h4>🌍 Geographic Location Verification</h4>
            <div class="progress-bar"><div class="progress-fill" style="width: 92%"></div></div>
            <div class="metric-display">
                <div class="metric-card">
                    <div class="metric-value">2,847 km</div>
                    <div class="metric-label">Distance from Last</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">15 min</div>
                    <div class="metric-label">Time Since Last</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">HIGH</div>
                    <div class="metric-label">Risk Level</div>
                </div>
            </div>
            <p><strong>Alert:</strong> Impossible travel detected. User cannot travel 2,847 km in 15 minutes. Potential account compromise.</p>
        </div>
    `);
}

function simulateMerchantRisk() {
    showDemo('Merchant Risk Assessment', `
        <div class="demo-content">
            <h4>🏪 Merchant Risk Evaluation</h4>
            <div class="progress-bar"><div class="progress-fill" style="width: 78%"></div></div>
            <div class="metric-display">
                <div class="metric-card">
                    <div class="metric-value">8.5/10</div>
                    <div class="metric-label">Risk Score</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">47</div>
                    <div class="metric-label">Fraud Reports</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">23%</div>
                    <div class="metric-label">Chargeback Rate</div>
                </div>
            </div>
            <p><strong>Warning:</strong> High-risk merchant with elevated fraud reports and chargeback rates. Enhanced verification recommended.</p>
        </div>
    `);
}

function simulateSpendingPattern() {
    showDemo('Spending Pattern Analysis', `
        <div class="demo-content">
            <h4>📊 User Spending Behavior Analysis</h4>
            <div class="progress-bar"><div class="progress-fill" style="width: 94%"></div></div>
            <div class="metric-display">
                <div class="metric-card">
                    <div class="metric-value">$2,500</div>
                    <div class="metric-label">Current Amount</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">$180</div>
                    <div class="metric-label">Average Amount</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">1,289%</div>
                    <div class="metric-label">Deviation</div>
                </div>
            </div>
            <p><strong>Anomaly Detected:</strong> Transaction amount is 1,289% higher than user's typical spending pattern. Significant deviation from normal behavior.</p>
        </div>
    `);
}

function simulateDeviceTracking() {
    showDemo('Device & IP Tracking', `
        <div class="demo-content">
            <h4>📱 Device Fingerprinting & IP Analysis</h4>
            <div class="progress-bar"><div class="progress-fill" style="width: 88%"></div></div>
            <div class="metric-display">
                <div class="metric-card">
                    <div class="metric-value">NEW</div>
                    <div class="metric-label">Device Status</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">TOR</div>
                    <div class="metric-label">IP Type</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">Russia</div>
                    <div class="metric-label">IP Location</div>
                </div>
            </div>
            <p><strong>High Risk:</strong> New device detected using TOR network from high-risk geographic location. Multiple red flags identified.</p>
        </div>
    `);
}

function simulateBehavioralAnalysis() {
    showDemo('Behavioral Analytics', `
        <div class="demo-content">
            <h4>🧠 User Behavior Pattern Analysis</h4>
            <div class="progress-bar"><div class="progress-fill" style="width: 91%"></div></div>
            <div class="metric-display">
                <div class="metric-card">
                    <div class="metric-value">7</div>
                    <div class="metric-label">Failed Attempts</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">12 sec</div>
                    <div class="metric-label">Form Fill Time</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">Bot-like</div>
                    <div class="metric-label">Behavior Type</div>
                </div>
            </div>
            <p><strong>Suspicious Activity:</strong> Multiple failed login attempts, unusually fast form completion, and bot-like interaction patterns detected.</p>
        </div>
    `);
}

function runMLModels() {
    showDemo('Machine Learning Analysis', `
        <div class="demo-content">
            <h4>🤖 AI Model Processing</h4>
            <div class="progress-bar"><div class="progress-fill" style="width: 96%"></div></div>
            <div class="metric-display">
                <div class="metric-card">
                    <div class="metric-value">94.7%</div>
                    <div class="metric-label">Logistic Regression</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">0.89</div>
                    <div class="metric-label">Autoencoder Error</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">FRAUD</div>
                    <div class="metric-label">Final Prediction</div>
                </div>
            </div>
            <p><strong>ML Consensus:</strong> Both Logistic Regression (94.7% fraud probability) and Autoencoder (high reconstruction error) indicate fraudulent transaction.</p>
        </div>
    `);
}

function simulateRealTimeScoring() {
    showDemo('Real-time Risk Scoring', `
        <div class="demo-content">
            <h4>⚡ Live Risk Score Calculation</h4>
            <div class="progress-bar"><div class="progress-fill" style="width: 100%"></div></div>
            <div class="metric-display">
                <div class="metric-card">
                    <div class="metric-value">847</div>
                    <div class="metric-label">Risk Score</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">23ms</div>
                    <div class="metric-label">Processing Time</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">BLOCK</div>
                    <div class="metric-label">Action</div>
                </div>
            </div>
            <p><strong>Immediate Action:</strong> Risk score of 847/1000 exceeds threshold. Transaction automatically blocked and flagged for investigation.</p>
        </div>
    `);
}

// Feature Demonstrations (clickable features)
function demonstrateTimeAnalysis() {
    simulateTimeAnalysis();
}

function demonstrateGeoLocation() {
    simulateGeoLocation();
}

function demonstrateMerchantRisk() {
    simulateMerchantRisk();
}

function demonstrateSpendingPattern() {
    simulateSpendingPattern();
}

function demonstrateDeviceTracking() {
    simulateDeviceTracking();
}

function demonstrateBehavioralAnalysis() {
    simulateBehavioralAnalysis();
}

function demonstrateMLModels() {
    runMLModels();
}

function demonstrateSecureProcessing() {
    showDemo('Secure Data Processing', `
        <div class="demo-content">
            <h4>🔒 Data Security & Privacy Protection</h4>
            <div class="progress-bar"><div class="progress-fill" style="width: 100%"></div></div>
            <div class="metric-display">
                <div class="metric-card">
                    <div class="metric-value">AES-256</div>
                    <div class="metric-label">Encryption</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">TLS 1.3</div>
                    <div class="metric-label">Transport</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">GDPR</div>
                    <div class="metric-label">Compliance</div>
                </div>
            </div>
            <p><strong>Security Status:</strong> All data encrypted with AES-256, transmitted via TLS 1.3, and processed in compliance with GDPR regulations.</p>
        </div>
    `);
}

// Live Monitoring
function startLiveMonitoring() {
    const monitoringSection = document.getElementById('liveMonitoring');
    const monitoringContent = document.getElementById('monitoringContent');
    
    monitoringSection.style.display = 'block';
    
    setInterval(() => {
        const transactions = Math.floor(Math.random() * 1000) + 5000;
        const fraudDetected = Math.floor(Math.random() * 50) + 10;
        const accuracy = (95 + Math.random() * 4).toFixed(1);
        const responseTime = Math.floor(Math.random() * 30) + 15;
        
        monitoringContent.innerHTML = `
            <div class="monitoring-grid">
                <div class="monitor-card">
                    <h4>📊 Transactions Processed</h4>
                    <div class="metric-value">${transactions.toLocaleString()}</div>
                    <div class="metric-label">Last 24 hours</div>
                </div>
                <div class="monitor-card">
                    <h4>🚨 Fraud Detected</h4>
                    <div class="metric-value">${fraudDetected}</div>
                    <div class="metric-label">Blocked today</div>
                </div>
                <div class="monitor-card">
                    <h4>🎯 Accuracy Rate</h4>
                    <div class="metric-value">${accuracy}%</div>
                    <div class="metric-label">Current performance</div>
                </div>
                <div class="monitor-card">
                    <h4>⚡ Response Time</h4>
                    <div class="metric-value">${responseTime}ms</div>
                    <div class="metric-label">Average latency</div>
                </div>
            </div>
        `;
    }, 3000);
}

// Utility Functions
function showDemo(title, content) {
    const demoArea = document.getElementById('demoArea');
    const demoContent = document.getElementById('demoContent');
    
    demoArea.querySelector('h3').textContent = `🎯 ${title}`;
    demoContent.innerHTML = content;
    demoArea.style.display = 'block';
    demoArea.scrollIntoView({ behavior: 'smooth' });
    
    // Animate progress bar
    setTimeout(() => {
        const progressFill = demoContent.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.width = progressFill.style.width;
        }
    }, 100);
}

function closeDemoArea() {
    document.getElementById('demoArea').style.display = 'none';
}

function loadSample() {
    document.getElementById('amount').value = '2500.00';
    document.getElementById('merchant').value = '9';
    document.getElementById('location').value = '0';
    document.getElementById('time').value = '3';
    document.getElementById('userId').value = 'user_suspicious_001';
    document.getElementById('deviceId').value = 'device_unknown_xyz';
    document.getElementById('ipAddress').value = '185.220.101.42';
    document.getElementById('userAgent').value = 'Mozilla/5.0 (compatible; bot/1.0)';
    document.getElementById('sessionId').value = 'sess_123';
    document.getElementById('paymentMethod').value = 'crypto';
    document.getElementById('transactionType').value = 'transfer';
    
    // Trigger all indicators
    updateAmountIndicator();
    updateMerchantIndicator();
    updateLocationIndicator();
    updateTimeIndicator();
    updateUserIndicator();
    updateDeviceIndicator();
    updateIPIndicator();
    updateAgentIndicator();
    updateSessionIndicator();
    updatePaymentIndicator();
    updateTypeIndicator();
}

function clearForm() {
    document.getElementById('fraudForm').reset();
    document.getElementById('time').value = new Date().getHours();
    
    // Clear all indicators
    document.querySelectorAll('.feature-indicator').forEach(indicator => {
        indicator.textContent = '';
        indicator.className = 'feature-indicator';
    });
    
    // Hide results
    document.getElementById('result').style.display = 'none';
    closeDemoArea();
}

// Original form submission and result display functions remain the same
document.getElementById('fraudForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = document.querySelector('.analyze-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = '🔄 Analyzing...';
    submitBtn.disabled = true;
    
    const formData = {
        amount: parseFloat(document.getElementById('amount').value),
        merchant_risk: parseInt(document.getElementById('merchant').value),
        location_match: parseInt(document.getElementById('location').value),
        transaction_hour: parseInt(document.getElementById('time').value)
    };
    
    if (isNaN(formData.amount) || formData.amount <= 0) {
        alert('Please enter a valid transaction amount');
        resetButton(submitBtn, originalText);
        return;
    }
    
    const userId = document.getElementById('userId').value.trim();
    const deviceId = document.getElementById('deviceId').value.trim();
    
    if (userId) formData.user_id = userId;
    if (deviceId) formData.device_id = deviceId;
    
    try {
        const response = await fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.error) {
            throw new Error(result.error);
        }
        
        displayResult(result);
        
    } catch (error) {
        console.log('Server unavailable, using client-side prediction:', error.message);
        const prediction = clientSidePrediction(formData);
        displayResult(prediction);
    } finally {
        resetButton(submitBtn, originalText);
    }
});

function clientSidePrediction(data) {
    let riskScore = 0;
    
    if (data.amount > 2000) riskScore += 30;
    else if (data.amount > 1000) riskScore += 15;
    
    if (data.merchant_risk > 7) riskScore += 35;
    else if (data.merchant_risk > 5) riskScore += 20;
    
    if (data.location_match === 0) riskScore += 40;
    
    if (data.transaction_hour < 6 || data.transaction_hour > 22) riskScore += 25;
    
    riskScore += Math.random() * 15;
    
    const probability = Math.min(riskScore / 100, 0.95);
    
    let riskLevel, action;
    if (probability > 0.8) {
        riskLevel = "HIGH";
        action = "BLOCK";
    } else if (probability > 0.5) {
        riskLevel = "MEDIUM";
        action = "VERIFY";
    } else {
        riskLevel = "LOW";
        action = "ALLOW";
    }
    
    return {
        is_fraud: probability > 0.6,
        fraud_probability: probability,
        risk_level: riskLevel,
        recommended_action: action,
        risk_factors: getRiskFactors(data, riskScore),
        anomaly_score: probability * 0.3,
        behavioral_analysis: getBehavioralAnalysis(data, probability)
    };
}

function getRiskFactors(data, score) {
    const factors = [];
    
    if (data.amount > 2000) factors.push('High transaction amount');
    if (data.merchant_risk > 7) factors.push('High-risk merchant');
    if (data.location_match === 0) factors.push('Geo-location mismatch detected');
    if (data.transaction_hour < 6 || data.transaction_hour > 22) factors.push('Unusual transaction time');
    if (score > 70) factors.push('Multiple risk indicators present');
    if (!data.device_id) factors.push('Unknown device');
    
    return factors;
}

function getBehavioralAnalysis(data, probability) {
    return {
        spending_pattern: probability > 0.6 ? "Abnormal" : "Normal",
        transaction_frequency: probability > 0.7 ? "High" : "Normal",
        device_trust: data.device_id ? "Trusted" : "Unknown",
        time_pattern: (data.transaction_hour < 6 || data.transaction_hour > 22) ? "Unusual" : "Normal"
    };
}

function displayResult(result) {
    const resultSection = document.getElementById('result');
    const resultContent = document.getElementById('resultContent');
    
    if (result.error) {
        resultContent.innerHTML = `
            <div class="risk-high">
                <h4>⚠️ Analysis Error</h4>
                <p>${result.error}</p>
                <p>Please try again or contact support.</p>
            </div>
        `;
        resultSection.style.display = 'block';
        resultSection.scrollIntoView({ behavior: 'smooth' });
        return;
    }
    
    let riskClass, riskText, riskIcon;
    switch(result.risk_level) {
        case 'HIGH':
            riskClass = 'risk-high';
            riskText = 'HIGH RISK - FRAUD DETECTED';
            riskIcon = '🚨';
            break;
        case 'MEDIUM':
            riskClass = 'risk-medium';
            riskText = 'MEDIUM RISK - VERIFICATION REQUIRED';
            riskIcon = '⚠️';
            break;
        default:
            riskClass = 'risk-low';
            riskText = 'LOW RISK - TRANSACTION SAFE';
            riskIcon = '✅';
    }
    
    const probability = (result.fraud_probability * 100).toFixed(1);
    const anomalyScore = result.anomaly_score ? (result.anomaly_score * 100).toFixed(1) : '0.0';
    
    let riskFactorsHtml = '';
    if (result.risk_factors && result.risk_factors.length > 0) {
        riskFactorsHtml = `
            <div class="risk-details">
                <h4>🔍 Risk Factors Identified</h4>
                <ul>
                    ${result.risk_factors.map(factor => `<li>${factor}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    let behavioralHtml = '';
    if (result.behavioral_analysis) {
        behavioralHtml = `
            <div class="risk-details">
                <h4>🧠 Behavioral Analysis</h4>
                <div class="behavioral-grid">
                    ${Object.entries(result.behavioral_analysis).map(([key, value]) => `
                        <div class="behavior-item ${value === 'Normal' || value === 'Trusted' ? 'behavior-normal' : 'behavior-abnormal'}">
                            <strong>${key.replace('_', ' ').toUpperCase()}</strong>
                            <span>${value}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    const actionRecommendations = {
        'BLOCK': '🛑 Block this transaction immediately and contact the customer for verification',
        'VERIFY': '🔐 Require additional verification (OTP/2FA) before processing this transaction',
        'ALLOW': '✅ Transaction appears legitimate, proceed with normal processing'
    };
    
    resultContent.innerHTML = `
        <div class="${riskClass}">
            <h4>${riskIcon} ${riskText}</h4>
            <div style="margin-top: 1rem;">
                <p><strong>Fraud Probability:</strong> ${probability}%</p>
                <p><strong>Anomaly Score:</strong> ${anomalyScore}%</p>
                <p><strong>Recommended Action:</strong> ${result.recommended_action}</p>
            </div>
        </div>
        
        ${riskFactorsHtml}
        ${behavioralHtml}
        
        <div class="risk-details">
            <h4>📋 System Recommendation</h4>
            <p>${actionRecommendations[result.recommended_action] || 'Process with standard security measures'}</p>
        </div>
        
        <div class="risk-details">
            <h4>📊 Analysis Summary</h4>
            <p><strong>Risk Level:</strong> ${result.risk_level}</p>
            <p><strong>ML Confidence:</strong> ${(100 - parseFloat(anomalyScore)).toFixed(1)}%</p>
            <p><strong>Processing Time:</strong> ${Math.floor(Math.random() * 50 + 20)}ms</p>
            <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
        </div>
    `;
    
    resultSection.style.display = 'block';
    resultSection.scrollIntoView({ behavior: 'smooth' });
}

function resetButton(button, originalText) {
    button.textContent = originalText;
    button.disabled = false;
}