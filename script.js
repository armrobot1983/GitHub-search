document.addEventListener('DOMContentLoaded', () => {
    const loadingElement = document.getElementById('github-loading');
    loadingElement.textContent = '正在加载 GitHub 项目...';
    
    fetchGitHubProjects('hardware+software+electronics+arduino+raspberry-pi');
});

function fetchGitHubProjects(topics) {
    const url = `https://api.github.com/search/repositories?q=${topics}+sort:stars-desc&per_page=30`;
    const loadingElement = document.getElementById('github-loading');
    const list = document.getElementById('github-list');

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            loadingElement.style.display = 'none'; // 隐藏加载提示
            list.innerHTML = ''; // 清空静态内容
            if (data.items && data.items.length > 0) {
                data.items.forEach(item => {
                    const li = document.createElement('li');
                    li.innerHTML = `<a href="${item.html_url}" target="_blank">${item.name}</a> - ${item.description || '无描述'} (${item.stargazers_count} stars)`;
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