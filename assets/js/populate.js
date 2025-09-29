// Populate About Section
data.about.forEach(function (item, idx){
    $('#about_p').append(item).append('<br>');
});

// Populate Education Section
data.education.forEach(function (item, idx){
    var logo = '<div class="card_logo_box">';
    logo += '<div class="card_logo">';
    logo += '<img src="./assets/icons/logos/' + item.logo + '">';
    logo += '</div>';
    logo += '</div>';
    
    var content = '<div class="timeline_item">';
    content += '<div class="card_info">';
    if(idx % 2 === 0) content += logo;
    content += '<div class="card_date">' + item.from + " - " + item.to + '</div>';
    if(idx % 2 !== 0) content += logo;
    content += '</div>';

    content += '<div class="card_item">';
    content += '<div class="card_title">' + item.school + '</div>';
    content += '<div class="card_subtitle">' + item.location + '</div>';
    content += '<div class="card_role">' + item.degree + ", " + item.major + ' (' + item.grade + ')' + '</div>';
    content += '<div class="inner_card_date">' + item.from + " - " + item.to + '</div>';

    if('desc' in item) {
        var ls = '<ul>';
        item.desc.forEach(function (item) {
            ls += '<li>' + item + '</li>';
        });
        ls += '</ul>';
        content += '<div class="card_content">' + ls + '</div>';
    }

    content += '</div>';
    content += '</div>';

    $('#education').find('.timeline_list').append(content);
});

// Populate Experience Section
data.experience.forEach(function (item, idx){
    var logo = '<div class="card_logo_box">';
    logo += '<div class="card_logo">';
    logo += '<img src="./assets/icons/logos/' + item.logo + '">';
    logo += '</div>';
    logo += '</div>';

    var ls = '<ul>';
    item.desc.forEach(function (item) { 
        ls += '<li>' + item + '</li>'; 
    });
    ls += '</ul>';

    var content = '<div class="timeline_item">';
    content += '<div class="card_info">';
    if(idx % 2 === 0) content += logo;
    content += '<div class="card_date">' + item.from + " - " + item.to + '</div>';
    if(idx % 2 !== 0) content += logo;
    content += '</div>';

    content += '<div class="card_item">';
    content += '<div class="card_title">' + item.company + '</div>';
    content += '<div class="card_subtitle">' + item.location + '</div>';
    content += '<div class="card_role">' + item.role + '</div>';
    content += '<div class="inner_card_date">' + item.from + " - " + item.to + '</div>';
    content += '<div class="card_content">' + ls + '</div>';
    content += '</div>';
    content += '</div>';

    $('#experience').find('.timeline_list').append(content);
});

// Populate Academic Projects Section
data.projects.forEach(function (item, idx){
    var logo = '<div class="card_logo_box">';
    logo += '<div class="card_logo">';
    logo += '<img src="./assets/icons/logos/' + item.logo + '">';
    logo += '</div>';
    logo += '</div>';
	
    var ls = '<ul>';
    item.desc.forEach(function (item) { 
        ls += '<li>' + item + '</li>'; 
    });
    ls += '</ul>';

    var content = '<div class="timeline_item">';
    content += '<div class="card_info">';
    if(idx % 2 === 0) content += logo;
    content += '<div class="card_date">' + item.from + " - " + item.to + '</div>';
    if(idx % 2 !== 0) content += logo;
    content += '</div>';

    content += '<div class="card_item">';
    content += '<div class="card_title">' + item.title + '</div>';
    content += '<div class="inner_card_date">' + item.from + " - " + item.to + '</div>';
    content += '<div class="card_content">' + ls + '</div>';
    content += '</div>';
    content += '</div>';

    $('#projects').find('.timeline_list').append(content);
}); 

// Populate GitHub Projects Section
data.github_projects.forEach(function (item, idx) {
    var techTags = '';
    if (item.technologies && item.technologies.length > 0) {
        item.technologies.forEach(function(tech) {
            techTags += '<span class="tech-tag">' + tech + '</span>';
        });
    }
    
    var content = '<div class="project-card fade-in">';
    content += '<div class="project-header">';
    content += '<h3 class="project-title">' + item.name + '</h3>';
    content += '<a href="' + item.html_url + '" target="_blank" class="project-link">🔗</a>';
    content += '</div>';
    content += '<p class="project-description">' + (item.description || 'No description available') + '</p>';
    content += '<div class="project-tech">' + techTags + '</div>';
    if (item.homepage) {
        content += '<div style="margin-top: 1rem;">';
        content += '<a href="' + item.homepage + '" target="_blank" style="color: var(--primary-color); font-weight: 500;">🌐 Live Demo</a>';
        content += '</div>';
    }
    content += '</div>';
    
    $('#github-projects-grid').append(content);
});

// Populate Leadership Section
data.leadership.forEach(function (item, idx){
    var logo = '<div class="card_logo_box">';
    logo += '<div class="card_logo">';
    logo += '<img src="./assets/icons/logos/' + item.logo + '">';
    logo += '</div>';
    logo += '</div>';
	
    var ls = '<ul>';
    item.desc.forEach(function (item) { 
        ls += '<li>' + item + '</li>'; 
    });
    ls += '</ul>';

    var content = '<div class="timeline_item">';
    content += '<div class="card_info">';
    if(idx % 2 === 0) content += logo;
    content += '<div class="card_date">' + item.from + " - " + item.to + '</div>';
    if(idx % 2 !== 0) content += logo;
    content += '</div>';

    content += '<div class="card_item">';
    content += '<div class="card_title">' + item.title + '</div>';
    content += '<div class="inner_card_date">' + item.from + " - " + item.to + '</div>';
    content += '<div class="card_content">' + ls + '</div>';
    content += '</div>';
    content += '</div>';

    $('#leadership').find('.timeline_list').append(content);
}); 

// Populate Interests Section
data.interests.forEach(function (item, idx, arr){
    var bullet = idx !== arr.length - 1 ? '\t|\t' : '';
    $('#interests').find('.timeline_block').append(item + bullet);
});