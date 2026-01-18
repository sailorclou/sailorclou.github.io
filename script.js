// Interactive features for the personal blog

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add reading time estimation for blog posts
    function estimateReadingTime() {
        const article = document.querySelector('.post-content');
        if (!article) return;

        const text = article.innerText;
        const wordCount = text.split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words per minute

        const readingTimeElement = document.createElement('div');
        readingTimeElement.className = 'reading-time';
        readingTimeElement.innerHTML = `📖 ${readingTime} min read`;
        readingTimeElement.style.cssText = `
            font-size: 0.875rem;
            color: #605e5c;
            margin-bottom: 1rem;
            font-style: italic;
        `;

        const postMeta = document.querySelector('.post-meta');
        if (postMeta) {
            postMeta.appendChild(readingTimeElement);
        }
    }

    // Add copy-to-clipboard functionality for code blocks
    function addCopyButtons() {
        const codeBlocks = document.querySelectorAll('pre code');
        codeBlocks.forEach(block => {
            const copyButton = document.createElement('button');
            copyButton.textContent = 'Copy';
            copyButton.className = 'copy-button';
            copyButton.style.cssText = `
                position: absolute;
                top: 0.5rem;
                right: 0.5rem;
                background: #0078d4;
                color: white;
                border: none;
                padding: 0.25rem 0.5rem;
                border-radius: 3px;
                font-size: 0.75rem;
                cursor: pointer;
                opacity: 0;
                transition: opacity 0.2s ease;
            `;

            const pre = block.parentElement;
            pre.style.position = 'relative';
            pre.appendChild(copyButton);

            pre.addEventListener('mouseenter', () => {
                copyButton.style.opacity = '1';
            });

            pre.addEventListener('mouseleave', () => {
                copyButton.style.opacity = '0';
            });

            copyButton.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(block.textContent);
                    copyButton.textContent = 'Copied!';
                    setTimeout(() => {
                        copyButton.textContent = 'Copy';
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy text: ', err);
                }
            });
        });
    }

    // Add scroll-to-top functionality
    function addScrollToTop() {
        const scrollButton = document.createElement('button');
        scrollButton.innerHTML = '↑';
        scrollButton.className = 'scroll-to-top';
        scrollButton.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
            background: #0078d4;
            color: white;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        `;

        document.body.appendChild(scrollButton);

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollButton.style.opacity = '1';
                scrollButton.style.visibility = 'visible';
            } else {
                scrollButton.style.opacity = '0';
                scrollButton.style.visibility = 'hidden';
            }
        });

        scrollButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Add keyboard navigation support
    function addKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Alt + H for home
            if (e.altKey && e.key === 'h') {
                e.preventDefault();
                window.location.href = 'index.html';
            }
            // Alt + A for about
            if (e.altKey && e.key === 'a') {
                e.preventDefault();
                window.location.href = 'about.html';
            }
            // Alt + C for contact
            if (e.altKey && e.key === 'c') {
                e.preventDefault();
                window.location.href = 'contact.html';
            }
        });
    }

    // Add theme toggle functionality (optional)
    function addThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.innerHTML = '🌙';
        themeToggle.className = 'theme-toggle';
        themeToggle.style.cssText = `
            position: fixed;
            top: 1rem;
            right: 1rem;
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 50%;
            background: #f3f2f1;
            border: 1px solid #edebe9;
            font-size: 1rem;
            cursor: pointer;
            z-index: 1000;
            transition: all 0.2s ease;
        `;

        document.body.appendChild(themeToggle);

        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggle.innerHTML = '☀️';
        }

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            themeToggle.innerHTML = isDark ? '☀️' : '🌙';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // Add dark theme styles
    // function addDarkThemeStyles() {
    //     const style = document.createElement('style');
    //     style.textContent = `
    //         // .dark-theme {
    //         //     background-color: #1a1a1a;
    //         //     color: #ffffff;
    //         // }
    //         // .dark-theme .header {
    //         //     background-color: #2d2d2d;
    //         //     border-bottom-color: #404040;
    //         // }
    //         // .dark-theme .post-card {
    //         //     background-color: #2d2d2d;
    //         //     border-color: #404040;
    //         // }
    //         .dark-theme .footer {
    //             background-color: #1a1a1a;
    //             border-top-color: #404040;
    //         }
    //         .dark-theme h1, .dark-theme h2, .dark-theme h3 {
    //             color: #ffffff;
    //         }
    //         .dark-theme p, .dark-theme .post-excerpt {
    //             color: #cccccc;
    //         }
    //         // .dark-theme .nav-link, .dark-theme .brand-link {
    //         //     color: #cccccc;
    //         // }
    //         // .dark-theme .nav-link:hover, .dark-theme .nav-link.active {
    //         //     color: #0078d4;
    //         // }
    //         // .dark-theme .sidebar {
    //         //     background-color: #2d2d2d;
    //         //     border-color: #404040;
    //         // }
    //         // .dark-theme .sidebar-title {
    //         //     color: #ffffff;
    //         //     border-bottom-color: #0078d4;
    //         // }
    //         .dark-theme .category-link {
    //             color: #cccccc;
    //         }
    //         .dark-theme .category-link:hover {
    //             background-color: #404040;
    //             color: #0078d4;
    //             border-color: #404040;
    //         }
    //         .dark-theme .category-link.active {
    //             background-color: #0078d4;
    //             color: #ffffff;
    //             border-color: #0078d4;
    //         }
    //         .dark-theme .category-count {
    //             background-color: #404040;
    //             color: #cccccc;
    //         }
    //         .dark-theme .category-link.active .category-count {
    //             background-color: rgba(255, 255, 255, 0.2);
    //             color: #ffffff;
    //         }
    //         .dark-theme .recent-post-link {
    //             color: #ffffff;
    //         }
    //         .dark-theme .recent-post-link:hover {
    //             color: #0078d4;
    //         }
    //         .dark-theme .recent-post-date {
    //             color: #cccccc;
    //         }
    //         .dark-theme .recent-post {
    //             border-bottom-color: #404040;
    //         }
    //         .dark-theme .sidebar-text {
    //             color: #cccccc;
    //         }
    //         .dark-theme .sidebar-link {
    //             color: #0078d4;
    //         }
    //         .dark-theme .sidebar-link:hover {
    //             color: #106ebe;
    //         }
    //         .dark-theme .tag {
    //             background-color: #404040;
    //             color: #ffffff;
    //             border-color: #404040;
    //         }
    //         .dark-theme .tag:hover {
    //             background-color: #0078d4;
    //             color: #ffffff;
    //             border-color: #0078d4;
    //         }
    //         .dark-theme .tag.active {
    //             background-color: #0078d4;
    //             color: #ffffff;
    //             border-color: #0078d4;
    //         }
    //         .dark-theme .skills-graph-container {
    //             background-color: #2d2d2d;
    //             border-color: #404040;
    //         }
    //         .dark-theme .skill-label {
    //             fill: #ffffff;
    //         }
    //         .dark-theme .skill-node:hover .skill-label {
    //             fill: #0078d4;
    //         }
    //         .dark-theme .skill-link {
    //             stroke: #404040;
    //         }
    //         .dark-theme .skill-link:hover {
    //             stroke: #0078d4;
    //         }
    //         .dark-theme .legend-label {
    //             color: #cccccc;
    //         }
    //         .dark-theme .github-link {
    //             color: #cccccc;
    //         }
    //         .dark-theme .github-link:hover {
    //             color: #0078d4;
    //         }
    //     `;
    //     document.head.appendChild(style);
    // }

    // Calculate and update blog post counts
    function updateBlogCounts() {
        const postCards = document.querySelectorAll('.post-card');
        const categoryCounts = {
            all: postCards.length,
            technology: 0,
            design: 0,
            life: 0
        };

        // Count posts by category
        postCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (category && categoryCounts.hasOwnProperty(category)) {
                categoryCounts[category]++;
            }
        });

        // Update category count displays
        const categoryLinks = document.querySelectorAll('.category-link');
        categoryLinks.forEach(link => {
            const category = link.getAttribute('data-category');
            const countElement = link.querySelector('.category-count');
            if (countElement && categoryCounts.hasOwnProperty(category)) {
                countElement.textContent = categoryCounts[category];
            }
        });

        // Log counts for debugging
        console.log('Blog post counts updated:', categoryCounts);
    }

    // Function to recalculate counts when content changes
    function recalculateBlogCounts() {
        // Small delay to ensure DOM is updated
        setTimeout(() => {
            updateBlogCounts();
        }, 100);
    }

    // Add category filtering functionality
    function addCategoryFiltering() {
        const categoryLinks = document.querySelectorAll('.category-link');
        const postCards = document.querySelectorAll('.post-card');

        categoryLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all category links
                categoryLinks.forEach(l => l.classList.remove('active'));
                // Add active class to clicked link
                link.classList.add('active');
                
                const selectedCategory = link.getAttribute('data-category');
                
                // Filter posts based on selected category
                postCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                        card.style.display = 'block';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        
                        // Animate in
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Add tag filtering functionality
    function addTagFiltering() {
        const tags = document.querySelectorAll('.tag');
        
        tags.forEach(tag => {
            tag.addEventListener('click', (e) => {
                e.preventDefault();
                const tagText = tag.textContent.toLowerCase();
                
                // Highlight clicked tag
                tags.forEach(t => t.classList.remove('active'));
                tag.classList.add('active');
                
                // Filter posts by tag
                const postCards = document.querySelectorAll('.post-card');
                postCards.forEach(card => {
                    const cardTags = Array.from(card.querySelectorAll('.tag')).map(t => t.textContent.toLowerCase());
                    
                    if (cardTags.includes(tagText)) {
                        card.style.display = 'block';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Create dynamic skills graph
    function createSkillsGraph() {
        const svg = d3.select('#skills-graph');
        const container = document.getElementById('skills-graph');
        const width = container.clientWidth;
        const height = 500;

        // Clear any existing content
        svg.selectAll('*').remove();

        // Skills data with categories, relationships, and blog connections
        const skillsData = {
            nodes: [
                // Frontend Technologies
                { id: 'HTML', group: 'frontend', level: 3, blogPosts: ['getting-started-with-web-development'] },
                { id: 'CSS', group: 'frontend', level: 3, blogPosts: ['getting-started-with-web-development', 'design-principles-for-modern-web'] },
                { id: 'JavaScript', group: 'frontend', level: 3, blogPosts: ['getting-started-with-web-development'] },
                { id: 'React', group: 'frontend', level: 2, blogPosts: ['getting-started-with-web-development'] },
                { id: 'Vue.js', group: 'frontend', level: 2, blogPosts: ['getting-started-with-web-development'] },
                { id: 'TypeScript', group: 'frontend', level: 2, blogPosts: ['getting-started-with-web-development'] },
                
                // Backend Technologies
                // { id: 'Node.js', group: 'backend', level: 3, blogPosts: ['getting-started-with-web-development'] },
                { id: 'Python', group: 'backend', level: 3, blogPosts: ['getting-started-with-web-development'] },
                // { id: 'Java', group: 'backend', level: 2, blogPosts: ['getting-started-with-web-development'] },
                { id: 'C++', group: 'backend', level: 2, blogPosts: ['getting-started-with-web-development'] },
                // { id: 'Express.js', group: 'backend', level: 2, blogPosts: ['getting-started-with-web-development'] },
                // { id: 'Django', group: 'backend', level: 2, blogPosts: ['getting-started-with-web-development'] },
                
                // Database Technologies
                { id: 'MySQL', group: 'database', level: 3, blogPosts: ['getting-started-with-web-development'] },
                // { id: 'MongoDB', group: 'database', level: 2, blogPosts: ['getting-started-with-web-development'] },
                { id: 'PostgreSQL', group: 'database', level: 2, blogPosts: ['getting-started-with-web-development'] },
                // { id: 'Redis', group: 'database', level: 1, blogPosts: ['getting-started-with-web-development'] },
                
                // Tools and Others
                { id: 'Git', group: 'tools', level: 3, blogPosts: ['getting-started-with-web-development'] },
                { id: 'Docker', group: 'tools', level: 2, blogPosts: ['getting-started-with-web-development'] },
                // { id: 'AWS', group: 'tools', level: 2, blogPosts: ['getting-started-with-web-development'] },
                { id: 'Linux', group: 'tools', level: 2, blogPosts: ['getting-started-with-web-development'] }
            ],
            links: [
                // Frontend connections
                { source: 'HTML', target: 'CSS', strength: 0.8 },
                { source: 'CSS', target: 'JavaScript', strength: 0.7 },
                { source: 'JavaScript', target: 'React', strength: 0.9 },
                { source: 'JavaScript', target: 'Vue.js', strength: 0.8 },
                { source: 'JavaScript', target: 'TypeScript', strength: 0.9 },
                
                // Backend connections
                // { source: 'JavaScript', target: 'Node.js', strength: 0.8 },
                // { source: 'Node.js', target: 'Express.js', strength: 0.9 },
                // { source: 'Python', target: 'Django', strength: 0.9 },
                // { source: 'Java', target: 'C++', strength: 0.6 },
                { source: 'Linux', target: 'C++', strength: 0.6 },
                
                // Database connections
                // { source: 'Node.js', target: 'MySQL', strength: 0.7 },
                { source: 'Python', target: 'PostgreSQL', strength: 0.7 },
                // { source: 'Node.js', target: 'MongoDB', strength: 0.8 },
                // { source: 'Redis', target: 'Node.js', strength: 0.6 },
                
                // Tool connections
                // { source: 'Git', target: 'Node.js', strength: 0.5 },
                { source: 'Git', target: 'Python', strength: 0.5 },
                // { source: 'Docker', target: 'Node.js', strength: 0.7 },
                // { source: 'AWS', target: 'Docker', strength: 0.6 },
                { source: 'Linux', target: 'Docker', strength: 0.8 },
                
                // Cross-category connections
                // { source: 'React', target: 'Node.js', strength: 0.6 },
                // { source: 'TypeScript', target: 'Node.js', strength: 0.7 },
                { source: 'MySQL', target: 'PostgreSQL', strength: 0.5 }
            ]
        };

        // Color scheme for different skill categories (lighter, muted colors)
        const colorScheme = {
            frontend: '#6b9bd2',
            backend: '#7a9a7a',
            database: '#b87a7a',
            tools: '#d4a574'
        };

        // Create force simulation with better parameters for containment
        const simulation = d3.forceSimulation(skillsData.nodes)
            .force('link', d3.forceLink(skillsData.links)
                .id(d => d.id)
                .distance(d => 60 + (1 - d.strength) * 30)
                .strength(d => d.strength))
            .force('charge', d3.forceManyBody().strength(-200))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('collision', d3.forceCollide().radius(d => 12 + d.level * 4))
            .force('x', d3.forceX(width / 2).strength(0.1))
            .force('y', d3.forceY(height / 2).strength(0.1));

        // Create SVG elements
        const g = svg.append('g');

        // Create links
        const link = g.append('g')
            .selectAll('line')
            .data(skillsData.links)
            .enter().append('line')
            .attr('class', 'skill-link')
            .attr('stroke-width', d => 1 + d.strength * 2);

        // Create nodes
        const node = g.append('g')
            .selectAll('g')
            .data(skillsData.nodes)
            .enter().append('g')
            .attr('class', 'skill-node')
            .call(d3.drag()
                .on('start', dragstarted)
                .on('drag', dragged)
                .on('end', dragended));

        // Add circles for nodes
        node.append('circle')
            .attr('r', d => 8 + d.level * 3)
            .attr('fill', d => colorScheme[d.group])
            .attr('stroke', '#ffffff')
            .attr('stroke-width', 2);

        // Add labels
        node.append('text')
            .attr('class', 'skill-label')
            .attr('dy', 4)
            .text(d => d.id);

        // Add tooltips
        node.append('title')
            .text(d => `${d.id} (Level ${d.level})`);

        // Add hover effects for nodes
        node.on('mouseenter', function(event, d) {
            // Prevent node bumping by not changing transform
            d3.select(this).select('circle')
                .attr('stroke-width', 3)
                .attr('stroke', '#0078d4');
            
            // Highlight connected nodes and edges
            const connectedNodes = new Set();
            skillsData.links.forEach(link => {
                if (link.source.id === d.id || link.target.id === d.id) {
                    connectedNodes.add(link.source.id);
                    connectedNodes.add(link.target.id);
                }
            });
            
            // Highlight connected nodes
            node.style('opacity', nodeData => 
                connectedNodes.has(nodeData.id) ? 1 : 0.4);
            
            // Highlight connected edges
            link.style('opacity', linkData => 
                linkData.source.id === d.id || linkData.target.id === d.id ? 1 : 0.2)
                .attr('stroke-width', linkData => 
                    linkData.source.id === d.id || linkData.target.id === d.id ? 3 : 1);
        });

        node.on('mouseleave', function(event, d) {
            // Reset node appearance
            d3.select(this).select('circle')
                .attr('stroke-width', 2)
                .attr('stroke', '#ffffff');
            
            // Reset all nodes and links
            node.style('opacity', 1);
            link.style('opacity', 0.6)
                .attr('stroke-width', d => 1 + d.strength * 2);
        });

        // Update positions on simulation tick with boundary constraints
        simulation.on('tick', () => {
            // Constrain nodes to stay within bounds
            skillsData.nodes.forEach(d => {
                const radius = 12 + d.level * 4;
                d.x = Math.max(radius, Math.min(width - radius, d.x));
                d.y = Math.max(radius, Math.min(height - radius, d.y));
            });

            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);

            node
                .attr('transform', d => `translate(${d.x},${d.y})`);
        });

        // Drag functions
        function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event, d) {
            const radius = 12 + d.level * 4;
            d.fx = Math.max(radius, Math.min(width - radius, event.x));
            d.fy = Math.max(radius, Math.min(height - radius, event.y));
        }

        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        // Add click interaction to show blog posts
        node.on('click', function(event, d) {
            // Prevent event bubbling
            event.stopPropagation();
            
            // Show related blog posts
            showRelatedBlogPosts(d.blogPosts, d.id);
        });

        // Reset on double click
        node.on('dblclick', function() {
            node.style('opacity', 1);
            link.style('opacity', 0.6);
            hideBlogPostModal();
        });

        // Handle window resize
        window.addEventListener('resize', function() {
            const newWidth = container.clientWidth;
            if (newWidth !== width) {
                // Restart simulation with new dimensions
                simulation.force('center', d3.forceCenter(newWidth / 2, height / 2));
                simulation.force('x', d3.forceX(newWidth / 2).strength(0.1));
                simulation.alpha(0.3).restart();
            }
        });
    }

    // Show related blog posts for a skill
    function showRelatedBlogPosts(blogPosts, skillName) {
        // Create or update blog post modal
        let modal = document.getElementById('blog-post-modal');
        if (!modal) {
            modal = createBlogPostModal();
        }
        
        // Update modal content
        const modalTitle = modal.querySelector('.modal-title');
        const modalContent = modal.querySelector('.modal-content');
        
        modalTitle.textContent = `Related Blog Posts for ${skillName}`;
        
        // Clear previous content
        modalContent.innerHTML = '';
        
        // Blog post data
        const blogPostData = {
            'getting-started-with-web-development': {
                title: 'Getting Started with Web Development',
                excerpt: 'A comprehensive guide for beginners who want to start their journey in web development.',
                url: 'posts/getting-started-with-web-development.html',
                date: 'December 15, 2024',
                category: 'Tech'
            },
            'design-principles-for-modern-web': {
                title: 'Design Principles for Modern Web',
                excerpt: 'Exploring the fundamental design principles that make websites beautiful and user-friendly.',
                url: 'posts/design-principles-for-modern-web.html',
                date: 'December 10, 2024',
                category: 'Design'
            },
            'finding-balance-in-digital-age': {
                title: 'Finding Balance in the Digital Age',
                excerpt: 'How to maintain a healthy relationship with technology while staying productive.',
                url: 'posts/finding-balance-in-digital-age.html',
                date: 'December 5, 2024',
                category: 'Life'
            }
        };
        
        // Add blog posts to modal
        blogPosts.forEach(postId => {
            const post = blogPostData[postId];
            if (post) {
                const postElement = document.createElement('div');
                postElement.className = 'modal-blog-post';
                postElement.innerHTML = `
                    <div class="modal-post-meta">
                        <span class="modal-post-category">${post.category}</span>
                        <span class="modal-post-date">${post.date}</span>
                    </div>
                    <h3 class="modal-post-title">
                        <a href="${post.url}" class="modal-post-link">${post.title}</a>
                    </h3>
                    <p class="modal-post-excerpt">${post.excerpt}</p>
                `;
                modalContent.appendChild(postElement);
            }
        });
        
        // Show modal
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    // Create blog post modal
    function createBlogPostModal() {
        const modal = document.createElement('div');
        modal.id = 'blog-post-modal';
        modal.className = 'blog-post-modal';
        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-container">
                <div class="modal-header">
                    <h2 class="modal-title">Related Blog Posts</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-content"></div>
            </div>
        `;
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .blog-post-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                display: none;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            }
            .modal-backdrop {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
            .modal-container {
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow: hidden;
                position: relative;
                z-index: 1001;
            }
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;
                border-bottom: 1px solid #edebe9;
                background-color: #f8f9fa;
            }
            .modal-title {
                margin: 0;
                color: #323130;
                font-size: 1.25rem;
            }
            .modal-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #605e5c;
                padding: 0.25rem;
                border-radius: 4px;
                transition: all 0.2s ease;
            }
            .modal-close:hover {
                background-color: #e1dfdd;
                color: #323130;
            }
            .modal-content {
                padding: 1.5rem;
                max-height: 60vh;
                overflow-y: auto;
            }
            .modal-blog-post {
                margin-bottom: 1.5rem;
                padding-bottom: 1.5rem;
                border-bottom: 1px solid #edebe9;
            }
            .modal-blog-post:last-child {
                border-bottom: none;
                margin-bottom: 0;
            }
            .modal-post-meta {
                display: flex;
                gap: 1rem;
                margin-bottom: 0.5rem;
                font-size: 0.875rem;
            }
            .modal-post-category {
                background-color: #f3f2f1;
                color: #323130;
                padding: 0.25rem 0.75rem;
                border-radius: 12px;
                font-weight: 500;
            }
            .modal-post-date {
                color: #605e5c;
            }
            .modal-post-title {
                margin-bottom: 0.5rem;
            }
            .modal-post-link {
                color: #323130;
                text-decoration: none;
                font-size: 1.125rem;
                font-weight: 600;
            }
            .modal-post-link:hover {
                color: #0078d4;
                text-decoration: none;
            }
            .modal-post-excerpt {
                color: #605e5c;
                margin: 0;
                line-height: 1.5;
            }
            .dark-theme .modal-container {
                background-color: #2d2d2d;
            }
            .dark-theme .modal-header {
                background-color: #404040;
                border-bottom-color: #404040;
            }
            .dark-theme .modal-title {
                color: #ffffff;
            }
            .dark-theme .modal-close {
                color: #cccccc;
            }
            .dark-theme .modal-close:hover {
                background-color: #404040;
                color: #ffffff;
            }
            .dark-theme .modal-blog-post {
                border-bottom-color: #404040;
            }
            .dark-theme .modal-post-category {
                background-color: #404040;
                color: #ffffff;
            }
            .dark-theme .modal-post-date {
                color: #cccccc;
            }
            .dark-theme .modal-post-link {
                color: #ffffff;
            }
            .dark-theme .modal-post-link:hover {
                color: #0078d4;
            }
            .dark-theme .modal-post-excerpt {
                color: #cccccc;
            }
        `;
        document.head.appendChild(style);
        
        // Add event listeners
        modal.querySelector('.modal-close').addEventListener('click', hideBlogPostModal);
        modal.querySelector('.modal-backdrop').addEventListener('click', hideBlogPostModal);
        
        // Add escape key listener
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                hideBlogPostModal();
            }
        });
        
        document.body.appendChild(modal);
        return modal;
    }

    // Hide blog post modal
    function hideBlogPostModal() {
        const modal = document.getElementById('blog-post-modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    // 自动生成并维护文章目录（TOC），支持定位与高亮
    function generateTOC() {
        const tocContainer = document.getElementById('toc');
        const content = document.querySelector('.page-body');
        if (!tocContainer || !content) return;

        // headings to include
        const selector = 'h1, h2, h3, h4';
        const headings = Array.from(content.querySelectorAll(selector));
        if (headings.length === 0) {
            tocContainer.innerHTML = '<p style="color:#605e5c; font-size:0.9rem;">（无目录）</p>';
            return;
        }

        // helper: slugify heading text
        function slugify(text) {
            return text.toString().toLowerCase().trim()
                .replace(/&nbsp;/g, ' ')
                .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
                .replace(/^-+|-+$/g, '')
                .replace(/--+/g, '-');
        }

        // ensure unique ids
        const usedIds = new Set();
        headings.forEach(h => {
            if (!h.id) {
                let base = slugify(h.textContent || h.innerText || 'heading');
                let id = base || 'heading';
                let i = 1;
                while (usedIds.has(id) || document.getElementById(id)) {
                    id = `${base}-${i++}`;
                }
                h.id = id;
                usedIds.add(id);
            } else {
                usedIds.add(h.id);
            }
        });

        // build nested list robustly (supports arbitrary starting level) and add collapse toggles
        tocContainer.innerHTML = '';
        const rootUl = document.createElement('ul');
        rootUl.className = 'toc-list';

        // determine minimum heading level to normalize nesting
        const levels = headings.map(h => parseInt(h.tagName.substring(1)));
        const minLevel = Math.min.apply(null, levels);

        // stack to keep track of UL elements for each level
        const stack = [rootUl];
        let currentLevel = minLevel;

        headings.forEach(h => {
            const level = parseInt(h.tagName.substring(1));
            const li = document.createElement('li');
            li.className = `toc-item toc-level-${level}`;

            const a = document.createElement('a');
            a.href = `#${h.id}`;
            a.className = 'toc-link';
            a.textContent = h.textContent.trim();
            a.setAttribute('data-target', h.id);
            a.setAttribute('aria-label', `go to ${h.textContent.trim()}`);

            // create header wrapper to hold toggle and link so nested UL sits after
            const header = document.createElement('div');
            header.className = 'toc-header';
            header.appendChild(a);
            li.appendChild(header);

            if (level > currentLevel) {
                // create nested UL(s) down to the new level
                for (let L = currentLevel + 1; L <= level; L++) {
                    const newUl = document.createElement('ul');
                    newUl.className = 'toc-sublist';

                    // attach to the last LI of the current top stack
                    const parentLi = stack[stack.length - 1].lastElementChild;
                    if (parentLi) {
                        // ensure parent has header wrapper
                        let parentHeader = parentLi.querySelector(':scope > .toc-header');
                        if (!parentHeader) {
                            const ph = document.createElement('div');
                            ph.className = 'toc-header';
                            // move existing firstElementChild (likely the anchor) into header
                            while (parentLi.firstChild) {
                                ph.appendChild(parentLi.firstChild);
                            }
                            parentLi.appendChild(ph);
                            parentHeader = ph;
                        }

                        // mark parent as having children and add toggle if not present
                        parentLi.classList.add('has-children');
                        if (!parentHeader.querySelector(':scope > .toc-toggle')) {
                            const toggle = document.createElement('button');
                            toggle.type = 'button';
                            toggle.className = 'toc-toggle';
                            toggle.setAttribute('aria-expanded', 'true');
                            toggle.innerHTML = '▾';
                            toggle.title = 'Toggle sub-sections';
                            toggle.addEventListener('click', (ev) => {
                                ev.stopPropagation();
                                const sub = parentLi.querySelector(':scope > ul.toc-sublist');
                                if (!sub) return;
                                const collapsed = sub.classList.toggle('collapsed');
                                toggle.innerHTML = collapsed ? '▸' : '▾';
                                toggle.setAttribute('aria-expanded', String(!collapsed));
                            });
                            // insert toggle as first child of header
                            parentHeader.insertBefore(toggle, parentHeader.firstChild);
                        }

                        parentLi.appendChild(newUl);
                        stack.push(newUl);
                    } else {
                        // fallback: append to current top
                        stack[stack.length - 1].appendChild(newUl);
                        stack.push(newUl);
                    }
                }
                currentLevel = level;
            } else if (level < currentLevel) {
                // pop stack until reaching correct parent level
                while (currentLevel > level && stack.length > 1) {
                    stack.pop();
                    currentLevel--;
                }
            }

            // append the new item to the current top list
            stack[stack.length - 1].appendChild(li);
        });

        tocContainer.appendChild(rootUl);

        // Add extra small styles for collapse/toggle if not already present
        if (!document.getElementById('toc-extra-styles')) {
            const extra = document.createElement('style');
            extra.id = 'toc-extra-styles';
            extra.textContent = `
                .toc-sublist { margin-left: 0.5rem; padding-left: 0.5rem; }
                .toc-header { display: flex; align-items: center; gap: 0.35rem; }
                .toc-toggle { background: none; border: none; padding: 0 0.35rem; margin-right: 0.25rem; cursor: pointer; color: #605e5c; font-size: 0.9rem; }
                .toc-item.has-children > .toc-header { font-weight: 600; }
                .toc-item.has-children > .toc-header > .toc-link { flex: 1 1 auto; }
                .toc-sublist.collapsed { display: none; }
                /* ensure toggle is visible in dark mode */
                .dark-theme .toc-toggle { color: #cfcfcf; }
            `;
            document.head.appendChild(extra);
        }

        // Smooth scrolling handled by global handler; add click to update history (optional)
        const tocLinks = tocContainer.querySelectorAll('a.toc-link');
        tocLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Allow global anchor handler to perform smooth scroll; update active state here
                setActiveTOC(link.getAttribute('data-target'));
                // update url hash without jumping
                history.replaceState(null, '', `#${link.getAttribute('data-target')}`);
            });
        });

        // active state management
        let activeId = null;
        let ticking = false;
        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(() => {
                const offset = 160; // consider header height
                let current = null;
                headings.forEach(h => {
                    const rect = h.getBoundingClientRect();
                    if (rect.top <= offset) current = h;
                });
                if (!current) current = headings[0];
                if (current && current.id !== activeId) {
                    activeId = current.id;
                    setActiveTOC(activeId);
                }
                ticking = false;
            });
        };

        function setActiveTOC(id) {
            const prev = tocContainer.querySelector('a.toc-link.active');
            if (prev) prev.classList.remove('active');
            const anchor = tocContainer.querySelector(`a.toc-link[data-target="${id}"]`);
            if (anchor) anchor.classList.add('active');
        }

        // initial highlight based on current scroll
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        // observe mutations in the content and regenerate TOC if headings changed
        if (window.__tocMutationObserver) {
            window.__tocMutationObserver.disconnect();
        }
        window.__tocMutationObserver = new MutationObserver((mutationsList) => {
            // if structure changes, rebuild TOC (debounced)
            if (window.__tocRebuildTimer) clearTimeout(window.__tocRebuildTimer);
            window.__tocRebuildTimer = setTimeout(() => generateTOC(), 150);
        });
        window.__tocMutationObserver.observe(content, { childList: true, subtree: true });
    }

    // Initialize all features
    generateTOC();
    estimateReadingTime();
    addCopyButtons();
    addScrollToTop();
    addKeyboardNavigation();
    addThemeToggle();
    // addDarkThemeStyles();
    updateBlogCounts();
    addCategoryFiltering();
    addTagFiltering();
    createSkillsGraph();

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe post cards for animation
    const postCards = document.querySelectorAll('.post-card');
    postCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});
