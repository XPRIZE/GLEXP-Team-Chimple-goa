<?php

class sc_post extends sc_entity
{
    public function __construct( $entity ) {
		parent::__construct( $entity, 'post' );
    }
	
	public function get_author_nicename() {
		return get_the_author_meta('user_nicename', $this->post->post_author);
	}
}