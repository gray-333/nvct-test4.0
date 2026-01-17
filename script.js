// 主应用逻辑
class NVCTApp {
    constructor() {
        this.currentPage = 'welcome';
        this.currentQuestion = 0;
        this.answers = [];
        this.userInfo = {
            age: null,
            gender: null,
            occupation: null
        };
        this.testStartTime = null;
        this.questionStartTime = null;
        
        // 管理员设置
        this.adminPassword = "NVCT2024"; // 可修改的管理员密码
        this.isAdmin = false;
        
        this.init();
    }

    init() {
        // 检查URL参数
        this.checkURLParams();
        
        // 初始化事件监听
        this.initEventListeners();
        
        // 初始化数据存储
        this.initStorage();
        
        // 显示当前页面
        this.showPage(this.currentPage);
    }

    checkURLParams() {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('admin') === '1') {
            this.showAdminModal();
        }
    }

    showAdminModal() {
        const modal = document.getElementById('adminModal');
        modal.classList.add('active');
        
        document.getElementById('submitAdminPassword').onclick = () => {
            const password = document.getElementById('adminPassword').value;
            if (password === this.adminPassword) {
                this.isAdmin = true;
                modal.classList.remove('active');
                this.showPage('admin');
            } else {
                this.showToast('密码错误，请重试');
            }
        };
        
        document.getElementById('cancelAdmin').onclick = () => {
            modal.classList.remove('active');
        };
    }

    initEventListeners() {
        // 开始测试按钮
        document.getElementById('startTest').addEventListener('click', () => {
            this.showPage('userInfo');
        });

        // 返回欢迎页
        document.getElementById('backToWelcome').addEventListener('click', () => {
            this.showPage('welcome');
        });

        // 用户信息选择
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const group = e.target.parentElement.parentElement;
                const type = group.querySelector('label').textContent;
                const value = e.target.dataset.value;
                
                // 移除同组其他按钮的选中状态
                group.querySelectorAll('.option-btn').forEach(b => {
                    b.classList.remove('selected');
                });
                
                // 设置当前按钮为选中状态
                e.target.classList.add('selected');
                
                // 保存用户信息
                switch(type) {
                    case '年龄区间':
                        this.userInfo.age = value;
                        break;
                    case '性别':
                        this.userInfo.gender = value;
                        break;
                    case '职业':
                        this.userInfo.occupation = value;
                        break;
                }
                
                // 检查是否可以开始测试
                this.checkUserInfoComplete();
            });
        });

        // 提交用户信息
        document.getElementById('submitUserInfo').addEventListener('click', () => {
            this.startTest();
        });

        // 测试导航
        document.getElementById('prevQuestion').addEventListener('click', () => {
            this.prevQuestion();
        });

        document.getElementById('nextQuestion').addEventListener('click', () => {
            this.nextQuestion();
        });

        document.getElementById('submitTest').addEventListener('click', () => {
            this.submitTest();
        });

        // 结果页面导航
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.target.dataset.section;
                this.showResultSection(section);
            });
        });

        // 重新测试
        document.getElementById('restartTest').addEventListener('click', () => {
            this.restartTest();
        });

        document.getElementById('restartFromEnd').addEventListener('click', () => {
            this.restartTest();
        });

        // 分享结果
        document.getElementById('shareResult').addEventListener('click', () => {
            this.shareResult();
        });

        // 查看管理面板
        document.getElementById('viewAdmin').addEventListener('click', () => {
            this.showAdminModal();
        });

        // 返回测试
        document.getElementById('backToTest').addEventListener('click', () => {
            this.showPage('welcome');
        });

        // 导出数据
        document.getElementById('exportData').addEventListener('click', () => {
            this.exportData();
        });

        // 时间筛选
        document.getElementById('timeFilter').addEventListener('change', (e) => {
            this.updateAdminData(e.target.value);
        });

        // 页面指示器
        document.querySelectorAll('.dot').forEach(dot => {
            dot.addEventListener('click', (e) => {
                const page = e.target.dataset.page;
                let targetPage;
                switch(page) {
                    case 'welcome': targetPage = 'welcome'; break;
                    case 'info': targetPage = 'userInfo'; break;
                    case 'test': targetPage = 'test'; break;
                    case 'result': targetPage = 'result'; break;
                    case 'end': targetPage = 'end'; break;
                }
                this.showPage(targetPage);
            });
        });
    }

    initStorage() {
        // 初始化localStorage
        if (!localStorage.getItem('nvct_tests')) {
            localStorage.setItem('nvct_tests', JSON.stringify([]));
        }
        
        // 初始化活动记录
        if (!localStorage.getItem('nvct_activity')) {
            localStorage.setItem('nvct_activity', JSON.stringify({}));
        }
    }

    showPage(pageName) {
        // 隐藏所有页面
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // 显示目标页面
        document.getElementById(pageName + 'Page').classList.add('active');
        
        // 更新页面指示器
        this.updatePageIndicator(pageName);
        
        // 执行页面特定逻辑
        switch(pageName) {
            case 'test':
                this.loadQuestion();
                break;
            case 'result':
                this.showResult();
                break;
            case 'admin':
                this.loadAdminData();
                break;
        }
        
        this.currentPage = pageName;
    }

    updatePageIndicator(pageName) {
        const pageMap = {
            'welcome': 'welcome',
            'userInfo': 'info',
            'test': 'test',
            'result': 'result',
            'end': 'end'
        };
        
        const targetDot = pageMap[pageName];
        document.querySelectorAll('.dot').forEach(dot => {
            dot.classList.remove('active');
            if (dot.dataset.page === targetDot) {
                dot.classList.add('active');
            }
        });
    }

    checkUserInfoComplete() {
        const complete = this.userInfo.age && this.userInfo.gender && this.userInfo.occupation;
        document.getElementById('submitUserInfo').disabled = !complete;
    }

    startTest() {
        this.testStartTime = Date.now();
        this.currentQuestion = 0;
        this.answers = new Array(questions.length).fill(null);
        this.showPage('test');
    }

    loadQuestion() {
        const question = questions[this.currentQuestion];
        
        // 更新进度
        const progressPercent = ((this.currentQuestion + 1) / questions.length * 100).toFixed(1);
        document.querySelector('.current-question').textContent = this.currentQuestion + 1;
        document.querySelector('.progress-percent').textContent = `${progressPercent}%`;
        document.querySelector('.progress-fill').style.width = `${progressPercent}%`;
        document.querySelector('.progress-dot').style.left = `${progressPercent}%`;
        
        // 显示题目
        document.querySelector('.question-category').textContent = question.dimension;
        document.querySelector('.question-text').textContent = question.text;
        
        // 显示选项
        const optionsContainer = document.querySelector('.question-options');
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'question-option';
            if (this.answers[this.currentQuestion] === option.value) {
                optionElement.classList.add('selected');
            }
            optionElement.textContent = `${String.fromCharCode(65 + index)}. ${option.text}`;
            optionElement.dataset.value = option.value;
            
            optionElement.addEventListener('click', () => {
                // 记录回答时间
                const answerTime = Math.floor((Date.now() - this.questionStartTime) / 1000);
                
                // 移除其他选项的选中状态
                optionsContainer.querySelectorAll('.question-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                // 选中当前选项
                optionElement.classList.add('selected');
                
                // 保存答案
                this.answers[this.currentQuestion] = option.value;
                
                // 启用下一步按钮
                document.getElementById('nextQuestion').disabled = false;
                if (this.currentQuestion === questions.length - 1) {
                    document.getElementById('submitTest').style.display = 'block';
                    document.getElementById('nextQuestion').style.display = 'none';
                }
            });
            
            optionsContainer.appendChild(optionElement);
        });
        
        // 更新导航按钮状态
        document.getElementById('prevQuestion').disabled = this.currentQuestion === 0;
        
        // 重置题目开始时间
        this.questionStartTime = Date.now();
    }

    prevQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.loadQuestion();
        }
    }

    nextQuestion() {
        if (this.answers[this.currentQuestion] === null) {
            this.showToast('请选择一个选项后再继续');
            return;
        }
        
        if (this.currentQuestion < questions.length - 1) {
            this.currentQuestion++;
            this.loadQuestion();
        }
    }

    submitTest() {
        // 检查是否所有题目都已回答
        const unanswered = this.answers.filter(a => a === null).length;
        if (unanswered > 0) {
            this.showToast(`还有${unanswered}道题目未回答`);
            return;
        }
        
        // 计算结果
        const result = this.calculateResult();
        
        // 保存测试记录
        this.saveTestRecord(result);
        
        // 显示结果页面
        this.showPage('result');
    }

    calculateResult() {
        // 统计每个字母的选择次数
        const counts = { O:0, C:0, F:0, T:0, N:0, B:0, R:0, D:0 };
        
        this.answers.forEach(answer => {
            if (answer) counts[answer]++;
        });
        
        // 确定每个维度的主导字母
        const dimension1 = counts.O >= counts.C ? 'O' : 'C';
        const dimension2 = counts.F >= counts.T ? 'F' : 'T';
        const dimension3 = counts.N >= counts.B ? 'N' : 'B';
        const dimension4 = counts.R >= counts.D ? 'R' : 'D';
        
        // 计算总用时
        const totalTime = Math.floor((Date.now() - this.testStartTime) / 1000);
        
        // 人格类型
        const personality = dimension1 + dimension2 + dimension3 + dimension4;
        
        return {
            personality,
            scores: counts,
            totalTime,
            dimensionScores: {
                dimension1: { O: counts.O, C: counts.C },
                dimension2: { F: counts.F, T: counts.T },
                dimension3: { N: counts.N, B: counts.B },
                dimension4: { R: counts.R, D: counts.D }
            }
        };
    }

    saveTestRecord(result) {
        const testRecord = {
            id: `NVCT_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            timestamp: new Date().toISOString(),
            userInfo: this.userInfo,
            answers: this.answers.map((answer, index) => ({
                [`q${index + 1}`]: answer
            })),
            result: result
        };
        
        // 保存到localStorage
        const tests = JSON.parse(localStorage.getItem('nvct_tests') || '[]');
        tests.push(testRecord);
        localStorage.setItem('nvct_tests', JSON.stringify(tests));
        
        // 记录活动
        this.recordActivity();
    }

    recordActivity() {
        const now = Date.now();
        const activity = JSON.parse(localStorage.getItem('nvct_activity') || '{}');
        activity[now] = true;
        
       
        localStorage.setItem('nvct_activity', JSON.stringify(activity));
    }

    showResult() {
        const tests = JSON.parse(localStorage.getItem('nvct_tests') || '[]');
        const latestTest = tests[tests.length - 1];
        
        if (!latestTest) {
            this.showToast('未找到测试结果');
            this.showPage('welcome');
            return;
        }
        
        const personality = latestTest.result.personality;
        const personalityData = personalities.data[personality] || personalities.data['OFNR'];
        
        // 显示人格名称
        document.querySelector('.personality-name').textContent = personalityData.name;
        
        // 显示人格徽章
        const badgeContainer = document.querySelector('.personality-badge');
        badgeContainer.innerHTML = '';
        for (let letter of personality) {
            const letterDiv = document.createElement('div');
            letterDiv.className = `badge-letter letter-${letter}`;
            letterDiv.textContent = letter;
            letterDiv.style.background = personalities.letterColors[letter];
            badgeContainer.appendChild(letterDiv);
        }
        
        // 显示核心特征
        document.querySelector('.core-description').textContent = personalityData.coreDescription;
        
        // 显示人格图标
        document.querySelector('.personality-icons').innerHTML = personalities.typeIcons[personality] || '🤝';
        
        // 显示能量分布
        this.showEnergyDistribution(latestTest.result.scores);
        
        // 显示分析内容 - 修改为两页布局
        this.showAnalysisContent(personalityData, personality);
        
        // 显示提示框
        this.showPersonalityTip(personality);
    }

    // 新增函数：显示人格提示
    showPersonalityTip(personality) {
        const analysisContent = document.querySelector('.analysis-content');
        const tipBox = document.createElement('div');
        tipBox.className = 'personality-tip';
        
        let tipText = '';
        if (personality === 'OFNR') {
            tipText = '<strong>OFNR是完美的非暴力沟通人格</strong>，你很少给别人带来伤害，总是客观、友好。';
        } else if (personality === 'CTBD') {
            tipText = '<strong>CTBD则是天生领袖圣体！</strong>你温暖昂扬，会给别人带来正能量，大家都愿意围绕在你身边。但也要多多注意他人的看法与感受哦～';
        } else {
            tipText = '冷色调字母代表你倾向于非暴力沟通，你很少给别人带来伤害。暖色调代表你温暖昂扬，会给别人带来正能量！但也要多多注意他人的看法与感受哦～';
        }
        
        tipText += '<br><br>不妨去了解一下NVC吧～';
        
        tipBox.innerHTML = `
            <div class="tip-content">
                <h4>💡 人格小贴士</h4>
                <p>${tipText}</p>
                <div class="dimension-list">
                    <h5>评定维度：</h5>
                    <ol>
                        <li><span class="dim-label">观察</span><span class="dim-letter O">(O)</span> vs <span class="dim-label">评论</span><span class="dim-letter C">(C)</span></li>
                        <li><span class="dim-label">感受</span><span class="dim-letter F">(F)</span> vs <span class="dim-label">想法</span><span class="dim-letter T">(T)</span></li>
                        <li><span class="dim-label">需要</span><span class="dim-letter N">(N)</span> vs <span class="dim-label">指责</span><span class="dim-letter B">(B)</span></li>
                        <li><span class="dim-label">请求</span><span class="dim-letter R">(R)</span> vs <span class="dim-label">要求</span><span class="dim-letter D">(D)</span></li>
                    </ol>
                </div>
            </div>
        `;
        
        analysisContent.appendChild(tipBox);
    }

    // 修改 showAnalysisContent 函数
    showAnalysisContent(personalityData, personality) {
        const contentContainer = document.querySelector('.analysis-content');
        contentContainer.innerHTML = '';
        
        // 更新导航按钮
        this.updateResultNavigation();
        
        // 第一页：优势分析、潜在挑战、交友建议
        const page1 = document.createElement('div');
        page1.className = 'analysis-page active';
        page1.id = 'analysis-page-1';
        
        page1.innerHTML = `
            <div class="page-header">
                <h3><span class="page-number">1</span>人格分析 - 第一部分</h3>
            </div>
            
            <div class="analysis-section active" id="section-strengths">
                <div class="section-title">
                    <span class="section-icon">✅</span>
                    <h4>优势分析</h4>
                </div>
                <div class="section-content">
                    <ul>
                        ${personalityData.strengths.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="analysis-section" id="section-challenges">
                <div class="section-title">
                    <span class="section-icon">⚠️</span>
                    <h4>潜在挑战</h4>
                </div>
                <div class="section-content">
                    <ul>
                        ${personalityData.challenges.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="analysis-section" id="section-friendship">
                <div class="section-title">
                    <span class="section-icon">👥</span>
                    <h4>交友建议</h4>
                </div>
                <div class="section-content">
                    <ul>
                        ${personalityData.friendship.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="page-nav">
                <button class="page-nav-btn next-page" data-page="2">下一页 →</button>
            </div>
        `;
        
        contentContainer.appendChild(page1);
        
        // 第二页：婚恋指南、提升策略、注意事项
        const page2 = document.createElement('div');
        page2.className = 'analysis-page';
        page2.id = 'analysis-page-2';
        
        page2.innerHTML = `
            <div class="page-header">
                <h3><span class="page-number">2</span>人格分析 - 第二部分</h3>
            </div>
            
            <div class="analysis-section" id="section-relationship">
                <div class="section-title">
                    <span class="section-icon">❤️</span>
                    <h4>婚恋匹配指南</h4>
                </div>
                <div class="section-content">
                    <ul>
                        ${personalityData.relationship.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="analysis-section" id="section-strategies">
                <div class="section-title">
                    <span class="section-icon">📈</span>
                    <h4>人际提升策略</h4>
                </div>
                <div class="section-content">
                    <ul>
                        ${personalityData.strategies.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="analysis-section" id="section-notes">
                <div class="section-title">
                    <span class="section-icon">💡</span>
                    <h4>特别注意事项</h4>
                </div>
                <div class="section-content">
                    <ul>
                        ${personalityData.notes.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="page-nav">
                <button class="page-nav-btn prev-page" data-page="1">← 上一页</button>
            </div>
        `;
        
        contentContainer.appendChild(page2);
        
        // 绑定翻页事件
        this.bindPageNavigation();
    }

    // 新增函数：更新结果导航
    updateResultNavigation() {
        const navContainer = document.querySelector('.result-navigation');
        navContainer.innerHTML = '';
        
        const pages = [
            { id: 'page1', label: '优势与挑战', icon: '✅' },
            { id: 'page2', label: '成长指南', icon: '📘' },
            { id: 'tip', label: '维度说明', icon: '📊' }
        ];
        
        pages.forEach((page, index) => {
            const btn = document.createElement('button');
            btn.className = `nav-btn ${index === 0 ? 'active' : ''}`;
            btn.dataset.page = page.id;
            btn.innerHTML = `${page.icon} ${page.label}`;
            navContainer.appendChild(btn);
        });
        
        // 绑定导航事件
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const pageId = e.target.dataset.page;
                this.showAnalysisPage(pageId);
            });
        });
    }

    // 新增函数：显示分析页面
    showAnalysisPage(pageId) {
        // 更新导航按钮状态
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.page === pageId) {
                btn.classList.add('active');
            }
        });
        
        // 显示对应的页面
        const pages = document.querySelectorAll('.analysis-page');
        const tipBox = document.querySelector('.personality-tip');
        
        pages.forEach(page => {
            page.classList.remove('active');
            page.style.display = 'none';
        });
        
        if (tipBox) tipBox.style.display = 'none';
        
        if (pageId === 'tip') {
            if (tipBox) {
                tipBox.style.display = 'block';
                tipBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            const targetPage = document.getElementById(`analysis-page-${pageId.slice(-1)}`);
            if (targetPage) {
                targetPage.classList.add('active');
                targetPage.style.display = 'block';
                targetPage.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }

    // 新增函数：绑定翻页事件
    bindPageNavigation() {
        // 绑定翻页按钮事件
        document.querySelectorAll('.page-nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetPage = e.target.dataset.page;
                this.showAnalysisPage(`page${targetPage}`);
            });
        });
    }

    showEnergyDistribution(scores) {
        const energyContainer = document.querySelector('.energy-bars');
        energyContainer.innerHTML = '';
        
        // 计算每个维度的相对强度
        const dimensions = [
            { label: '观察/评论', value1: scores.O, value2: scores.C, letter1: 'O', letter2: 'C' },
            { label: '感受/想法', value1: scores.F, value2: scores.T, letter1: 'F', letter2: 'T' },
            { label: '需要/指责', value1: scores.N, value2: scores.B, letter1: 'N', letter2: 'B' },
            { label: '请求/要求', value1: scores.R, value2: scores.D, letter1: 'R', letter2: 'D' }
        ];
        
        dimensions.forEach(dim => {
            const total = dim.value1 + dim.value2;
            const percentage1 = total > 0 ? (dim.value1 / total * 100) : 50;
            const percentage2 = total > 0 ? (dim.value2 / total * 100) : 50;
            
            const barContainer = document.createElement('div');
            barContainer.className = 'energy-bar';
            
            // 标签
            const label = document.createElement('div');
            label.className = 'energy-label';
            label.textContent = dim.label;
            barContainer.appendChild(label);
            
            // 能量条
            const fillContainer = document.createElement('div');
            fillContainer.className = 'energy-fill';
            
            const level1 = document.createElement('div');
            level1.className = 'energy-level';
            level1.style.width = `${percentage1}%`;
            level1.style.background = personalities.letterColors[dim.letter1];
            
            const level2 = document.createElement('div');
            level2.className = 'energy-level';
            level2.style.width = `${percentage2}%`;
            level2.style.background = personalities.letterColors[dim.letter2];
            
            fillContainer.appendChild(level1);
            fillContainer.appendChild(level2);
            barContainer.appendChild(fillContainer);
            
            energyContainer.appendChild(barContainer);
        });
    }

    showResultSection(sectionId) {
        // 更新导航按钮状态
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.section === sectionId) {
                btn.classList.add('active');
            }
        });
        
        // 显示对应的内容部分
        document.querySelectorAll('.analysis-section').forEach(section => {
            section.classList.remove('active');
            if (section.id === `section-${sectionId}`) {
                section.classList.add('active');
            }
        });
    }

    restartTest() {
        this.currentQuestion = 0;
        this.answers = [];
        this.userInfo = { age: null, gender: null, occupation: null };
        
        // 重置表单
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        document.getElementById('submitUserInfo').disabled = true;
        
        this.showPage('welcome');
    }

    shareResult() {
        const tests = JSON.parse(localStorage.getItem('nvct_tests') || '[]');
        const latestTest = tests[tests.length - 1];
        
        if (!latestTest) return;
        
        const personality = latestTest.result.personality;
        const personalityData = personalities.data[personality] || personalities.data['OFNR'];
        
        const shareText = `我在NVCT非暴力沟通人格测试中获得了${personality} - ${personalityData.name}类型！\n\n测试链接：${window.location.origin}${window.location.pathname}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'NVCT非暴力沟通人格测试结果',
                text: shareText,
                url: window.location.href
            });
        } else {
            // 复制到剪贴板
            navigator.clipboard.writeText(shareText).then(() => {
                this.showToast('结果已复制到剪贴板，可以分享给朋友了！');
            });
        }
    }

    loadAdminData() {
        if (!this.isAdmin) {
            this.showAdminModal();
            return;
        }
        
        this.updateAdminData('today');
    }

    updateAdminData(timeRange) {
        const tests = JSON.parse(localStorage.getItem('nvct_tests') || '[]');
        const now = new Date();
        
        // 筛选数据
        let filteredTests = tests;
        if (timeRange !== 'all') {
            filteredTests = tests.filter(test => {
                const testDate = new Date(test.timestamp);
                switch(timeRange) {
                    case 'today':
                        return testDate.toDateString() === now.toDateString();
                    case 'week':
                        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                        return testDate >= weekAgo;
                    case 'month':
                        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                        return testDate >= monthAgo;
                    default:
                        return true;
                }
            });
        }
        
        // 更新统计数据
        this.updateStats(filteredTests);
        
        // 更新图表
        this.updateCharts(filteredTests);
        
        // 更新数据表格
        this.updateDataTable(filteredTests);
    }

    updateStats(tests) {
        // 在线人数
        const activity = JSON.parse(localStorage.getItem('nvct_activity') || '{}');
        const onlineCount = Object.keys(activity).length;
        document.getElementById('onlineCount').textContent = onlineCount;
        
        // 测试数量统计
        const today = new Date().toDateString();
        const todayTests = tests.filter(test => 
            new Date(test.timestamp).toDateString() === today
        ).length;
        
        document.getElementById('todayCount').textContent = todayTests;
        document.getElementById('monthCount').textContent = tests.length;
        
        // 平均用时
        const avgTime = tests.length > 0 
            ? Math.round(tests.reduce((sum, test) => sum + test.result.totalTime, 0) / tests.length / 60)
            : 0;
        document.getElementById('avgTime').textContent = avgTime;
        
        // 最受欢迎人格TOP 3
        this.updateTopPersonalities(tests);
    }

    updateTopPersonalities(tests) {
        // 统计人格类型出现次数
        const personalityCounts = {};
        tests.forEach(test => {
            const personality = test.result.personality;
            personalityCounts[personality] = (personalityCounts[personality] || 0) + 1;
        });
        
        // 排序并取前3
        const topPersonalities = Object.entries(personalityCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3);
        
        const container = document.getElementById('topPersonalities');
        container.innerHTML = '';
        
        topPersonalities.forEach(([personality, count], index) => {
            const personalityData = personalities.data[personality] || { name: '未知人格' };
            const item = document.createElement('div');
            item.className = 'top-item';
            
            item.innerHTML = `
                <div class="top-rank">${index + 1}</div>
                <div class="top-badge">
                    ${personality.split('').map(letter => 
                        `<div class="badge-letter letter-${letter}" style="background: ${personalities.letterColors[letter]}">${letter}</div>`
                    ).join('')}
                </div>
                <div class="top-info">
                    <div class="top-type">${personality}</div>
                    <div class="top-name">${personalityData.name}</div>
                </div>
                <div class="top-count">${count}次</div>
            `;
            
            container.appendChild(item);
        });
    }

    updateCharts(tests) {
        if (tests.length === 0) return;
        
        // 人格类型分布饼图
        this.updatePersonalityChart(tests);
        
        // 用户年龄分布柱状图
        this.updateAgeChart(tests);
        
        // 用户性别分布饼图
        this.updateGenderChart(tests);
        
        // 用户职业分布条形图
        this.updateOccupationChart(tests);
    }

    updatePersonalityChart(tests) {
        const personalityCounts = {};
        tests.forEach(test => {
            const personality = test.result.personality;
            personalityCounts[personality] = (personalityCounts[personality] || 0) + 1;
        });
        
        const ctx = document.getElementById('personalityChart').getContext('2d');
        
        // 销毁之前的图表实例
        if (window.personalityChart) {
            window.personalityChart.destroy();
        }
        
        window.personalityChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: Object.keys(personalityCounts),
                datasets: [{
                    data: Object.values(personalityCounts),
                    backgroundColor: Object.keys(personalityCounts).map(personality => 
                        personality.split('').map(letter => personalities.letterColors[letter])
                    ).map(colors => this.mixColors(colors)),
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right'
                    },
                    title: {
                        display: true,
                        text: '人格类型分布'
                    }
                }
            }
        });
    }

    updateAgeChart(tests) {
        const ageGroups = ['18岁以下', '18-25', '26-35', '36-45', '46-55', '56岁以上'];
        const ageCounts = {};
        ageGroups.forEach(group => ageCounts[group] = 0);
        
        tests.forEach(test => {
            if (test.userInfo.age && ageCounts[test.userInfo.age] !== undefined) {
                ageCounts[test.userInfo.age]++;
            }
        });
        
        const ctx = document.getElementById('ageChart').getContext('2d');
        
        if (window.ageChart) {
            window.ageChart.destroy();
        }
        
        window.ageChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ageGroups,
                datasets: [{
                    label: '测试人数',
                    data: ageGroups.map(group => ageCounts[group]),
                    backgroundColor: '#3498db',
                    borderColor: '#2980b9',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: '用户年龄分布'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }

    updateGenderChart(tests) {
        const genderGroups = ['男', '女', '其他', '不愿透露'];
        const genderCounts = {};
        genderGroups.forEach(group => genderCounts[group] = 0);
        
        tests.forEach(test => {
            if (test.userInfo.gender && genderCounts[test.userInfo.gender] !== undefined) {
                genderCounts[test.userInfo.gender]++;
            }
        });
        
        const ctx = document.getElementById('genderChart').getContext('2d');
        
        if (window.genderChart) {
            window.genderChart.destroy();
        }
        
        window.genderChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: genderGroups,
                datasets: [{
                    data: genderGroups.map(group => genderCounts[group]),
                    backgroundColor: ['#3498db', '#9b59b6', '#e74c3c', '#95a5a6'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right'
                    },
                    title: {
                        display: true,
                        text: '用户性别分布'
                    }
                }
            }
        });
    }

    updateOccupationChart(tests) {
        const occupations = ['学生', '教育', 'IT/科技', '医疗', '金融', '销售/市场', '自由职业', '其他'];
        const occupationCounts = {};
        occupations.forEach(occ => occupationCounts[occ] = 0);
        
        tests.forEach(test => {
            if (test.userInfo.occupation && occupationCounts[test.userInfo.occupation] !== undefined) {
                occupationCounts[test.userInfo.occupation]++;
            }
        });
        
        const ctx = document.getElementById('occupationChart').getContext('2d');
        
        if (window.occupationChart) {
            window.occupationChart.destroy();
        }
        
        window.occupationChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: occupations,
                datasets: [{
                    label: '测试人数',
                    data: occupations.map(occ => occupationCounts[occ]),
                    backgroundColor: '#2ecc71',
                    borderColor: '#27ae60',
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: '用户职业分布'
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }

    mixColors(colors) {
        // 简单混合颜色，用于饼图
        if (colors.length === 1) return colors[0];
        
        // 将颜色转换为RGB
        const rgbColors = colors.map(color => {
            const hex = color.replace('#', '');
            const r = parseInt(hex.substr(0, 2), 16);
            const g = parseInt(hex.substr(2, 2), 16);
            const b = parseInt(hex.substr(4, 2), 16);
            return { r, g, b };
        });
        
        // 计算平均值
        const avg = rgbColors.reduce((acc, color) => {
            acc.r += color.r;
            acc.g += color.g;
            acc.b += color.b;
            return acc;
        }, { r: 0, g: 0, b: 0 });
        
        avg.r = Math.round(avg.r / rgbColors.length);
        avg.g = Math.round(avg.g / rgbColors.length);
        avg.b = Math.round(avg.b / rgbColors.length);
        
        // 转换回hex
        const toHex = (c) => c.toString(16).padStart(2, '0');
        return `#${toHex(avg.r)}${toHex(avg.g)}${toHex(avg.b)}`;
    }

    updateDataTable(tests) {
        const tableBody = document.querySelector('#recordsTable tbody');
        tableBody.innerHTML = '';
        
        // 显示最新的50条记录
        const displayTests = tests.slice(-50).reverse();
        
        displayTests.forEach(test => {
            const row = document.createElement('tr');
            const date = new Date(test.timestamp);
            
            row.innerHTML = `
                <td>${date.toLocaleString('zh-CN')}</td>
                <td>${test.result.personality}</td>
                <td>${test.userInfo.age || '-'}</td>
                <td>${test.userInfo.gender || '-'}</td>
                <td>${test.userInfo.occupation || '-'}</td>
                <td>${test.result.totalTime}</td>
            `;
            
            tableBody.appendChild(row);
        });
    }

    exportData() {
        const tests = JSON.parse(localStorage.getItem('nvct_tests') || '[]');
        
        // 转换为CSV格式
        const headers = ['时间戳', '人格类型', '年龄', '性别', '职业', '总用时(秒)'];
        const rows = tests.map(test => [
            test.timestamp,
            test.result.personality,
            test.userInfo.age || '',
            test.userInfo.gender || '',
            test.userInfo.occupation || '',
            test.result.totalTime
        ]);
        
        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');
        
        // 创建下载链接
        const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', `nvct_data_${new Date().toISOString().slice(0, 10)}.csv`);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showToast('数据已导出为CSV文件');
    }

    showToast(message) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new NVCTApp();
});


