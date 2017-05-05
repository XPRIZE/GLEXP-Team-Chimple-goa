<?php
/**
 * Abstract SocialChef Entity Class
 *
 * The SocialChef entity class handles individual entity data.
 *
 * @class 		sc_entity
 * @package		SocialChef/Abstracts
 * @category	Abstract Class
 * @author 		SocialChef
 */
 abstract class sc_entity {
  
 	/** @var int The entity (post) ID. */
	public $id;

	/** @var object The actual post object. */
	public $post;
 
 	/** @var string The entity's type (recipe). */
	public $entity_type = null;
	
	private $meta = null;
	/**
	 * Constructor gets the post object and sets the ID for the loaded entity.
	 *
	 * @access public
	 * @param int|byt_entity|WP_Post $entity Entity ID, post object, or entity object
	 */
	public function __construct( $entity, $entity_type ) {
		if ( is_numeric( $entity ) ) {
			$this->id   = absint( $entity );
			$this->post = get_post( $this->id );
			$this->entity_type = $entity_type;
		} elseif ( $entity instanceof byt_entity ) {
			$this->id   = absint( $entity->id );
			$this->post = $entity;
			$this->entity_type = $entity_type;
		} elseif ( $entity instanceof WP_Post || isset( $entity->ID ) ) {
			$this->id   = absint( $entity->ID );
			$this->post = $entity;
			$this->entity_type = $entity_type;			
		}
		
		$this->meta = get_post_custom($this->id);
	}
	
	private function get_prefix($use_prefix) {
		return $use_prefix ? $this->entity_type . '_' : '';
	}
	
	public function get_status() {
		return $this->post->post_status;
	}
	
	/**
	 * is_custom_field_set function.
	 *
	 * @access public
	 * @param mixed $key
	 * @return bool
	 */
	public function is_custom_field_set( $key ) {
		$key_to_use = $this->get_prefix($use_prefix) . $key;
		return isset($this->meta[$key_to_use]);
		// return metadata_exists( 'post', $this->id, $this->get_prefix() . $key );
	}
	
	/**
	 * get_custom_field function.
	 *
	 * @access public
	 * @param mixed $key
	 * @return mixed
	 */
	public function get_custom_field( $key, $use_prefix = true, $use_base_id = false ) {

		$post_id = $this->id;
		if ($use_base_id)
			$post_id = $this->get_base_id();
	
		$key_to_use = $this->get_prefix($use_prefix) . $key;
	
		$value = isset($this->meta[$key_to_use]) ? $this->meta[$key_to_use][0] : null;

		return $value;
	}
		
	/**
	 * Get the entity's entity type
	 * @return string
	 */
	public function get_entity_type() {
		return $this->entity_type;
	}
	
	/**
	 * Get the entity's post data.
	 *
	 * @access public
	 * @return object
	 */
	public function get_post_data() {
		return $this->post;
	}
	
	/**
	 * Wrapper for get_permalink
	 * @return string
	 */
	public function get_permalink() {
		return apply_filters( 'socialchef_entity_permalink', $this->post ? get_permalink( $this->id ) : '', $this );
	}
	
	/**
	 * Checks the entity type.
	 *
	 * @access public
	 * @param mixed $type Array or string of types
	 * @return bool
	 */
	public function is_type( $type ) {
		return ( $this->entity_type == $type || ( is_array( $type ) && in_array( $this->entity_type, $type ) ) ) ? true : false;
	}
	
	/**
	 * Returns whether or not the entity post exists.
	 *
	 * @access public
	 * @return bool
	 */
	public function exists() {
		return empty( $this->post ) ? false : true;
	}
	
	/**
	 * Get the ID of the post.
	 *
	 * @access public
	 * @return int
	 */
	public function get_id() {
		return apply_filters( 'socialchef_entity_id', $this->post ? $this->id : null, $this );
	}
	
	/**
	 * Get the base ID of the post (ID of post in default language)
	 *
	 * @access public
	 * @return int
	 */
	public function get_base_id() {
		return apply_filters( 'socialchef_entity_base_id', $this->post ? SocialChef_Theme_Utils::get_default_language_post_id($this->post->ID, $this->entity_type ) : null, $this );
	}
	
	/**
	 * Get the title of the post.
	 *
	 * @access public
	 * @return string
	 */
	public function get_title() {
		return apply_filters( 'socialchef_entity_title', $this->post ? $this->post->post_title : '', $this );
	}
	
	/**
	 * Get the description of the post.
	 *
	 * @access public
	 * @return string
	 */
	public function get_description() {
		$description = '';
		if ($this->post) {
			$description = $this->post->post_content;
			$description = apply_filters('the_content', $description);
		}
		return apply_filters( 'socialchef_entity_description', $description, $this );
	}
		
	/**
	 * Get the excerpt of the post.
	 *
	 * @access public
	 * @return string
	 */
	public function get_excerpt() {
		$description = '';
		if ($this->post) {
			$description = $this->post->post_content;
			$description = apply_filters('the_excerpt', $description);
			$description = wp_trim_words($description, 20);
		}
		return apply_filters( 'socialchef_entity_description', $description, $this );
	}
	
	/**
	 * Get the description of the post.
	 *
	 * @access public
	 * @return string
	 */
	public function get_content() {
		$content = '';
		if ($this->post) {
			$content = $this->post->post_content;
		}
		return $content;
	}
	
	/**
	 * Get the featured image of the post.
	 *
	 * @access public
	 * @return string
	 */
	public function get_main_image($image_size = 'content-image') {
		$featured_image = '';
		if ($this->post && has_post_thumbnail( $this->post->ID )) {
			$featured_image = wp_get_attachment_image_src( get_post_thumbnail_id( $this->post->ID ), $image_size );
			$featured_image = $featured_image[ 0 ];
		}
		return apply_filters( 'socialchef_entity_featured_image', $featured_image, $this );
	}	

	/**
	 * Get images of the entity
	 *
	 * @access public
	 * @return array
	 */	
    public function get_images() {	
		return $this->get_custom_field( 'images' );
    }
	
	/**
	 * Get the parent of the post.
	 *
	 * @access public
	 * @return int
	 */
	public function get_parent() {
		return apply_filters( 'socialchef_entity_parent', absint( $this->post->post_parent ), $this );
	}
 }