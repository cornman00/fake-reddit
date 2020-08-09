import React from 'react'

const CommunityBanner = () => {
    return (
        <div className="community-container">
            <div className="about-community">About Community</div>
            <p className="community-description">This subreddit is for anyone/anything related to UIUC. Students, Alumni, Faculty, and Townies are all welcome. Given the lack of a regional subreddit, it also covers most things in the Champaign-Urbana area. This subreddit is not sponsored or endorsed by the University of Illinois or any other on-campus group.</p>
            <hr/>
            <div className="community-date-created">
                <i class="fas fa-birthday-cake"></i> 
                <p>Created Aug 7, 2020</p> 
            </div>
        </div>
    )
}


export default CommunityBanner