document.addEventListener('DOMContentLoaded', () => {
    const loadingElement = document.getElementById('github-loading');
    loadingElement.textContent = '正在加载 GitHub 项目...';

    // 关闭详情页
    document.getElementById('close-details').addEventListener('click', () => {
        document.getElementById('project-details').style.display = 'none';
    });

    // 显示项目详情
    function showProjectDetails(owner, repo) {
        const url = `[invalid url, do not cite]
        fetch(url, {
            headers: {
                'Accept': 'application/vnd.github.v3.raw'
            }
        })
        .then(response => {
            if (!response.ok) throw new Error('无法获取 README');
            return response.text();
        })
        .then(markdown => {
            const html = marked(markdown);
            document.getElementById('project-title').textContent = repo;
            document.getElementById('project-readme').innerHTML = html;
            document.getElementById('project-link').href = `[invalid url, do not cite]
            document.getElementById('project-details').style.display = 'block';
        })
        .catch(error => {
            console.error('获取 README 时出错：', error);
            document.getElementById('project-readme').innerHTML = '<p>无法加载 README。</p>';
        });
    }

    // 获取 GitHub 项目
    function fetchGitHubProjects(topics) {
        const url = `[invalid url, do not cite]
        const list = document.getElementById('github-list');

        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP 错误！状态：${response.status}`);
                return response.json();
            })
            .then(data => {
                loadingElement.style.display = 'none';
                list.innerHTML = '';
                if (data.items && data.items.length > 0) {
                    data.items.forEach(item => {
                        const li = document.createElement('li');
                        const a = document.createElement('a');
                        a.href = '#';
                        a.textContent = item.name;
                        a.onclick = (e) => {
                            e.preventDefault();
                            showProjectDetails(item.owner.login, item.name);
                        };
                        li.appendChild(a);
                        const desc = document.createElement('span');
                        desc.textContent = ` - ${item.description || '无描述'} (${item.stargazers_count} stars)`;
                        li.appendChild(desc);
                        list.appendChild(li);
                    });
                } else {
                    list.innerHTML = '<p>未找到相关项目，显示静态项目列表。</p>';
                }
            })
            .catch(error => {
                console.error('获取 GitHub 数据时出错：', error);
                loadingElement.textContent = '加载 GitHub 项目失败，显示静态项目列表。';
            });
    }

    fetchGitHubProjects('hardware+software+electronics+arduino+raspberry-pi');
});