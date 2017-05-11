<?php

class sc_recipe extends sc_entity
{
    public function __construct( $entity ) {
		parent::__construct( $entity, 'recipe' );
    }

	public function get_instructions() {
		return $this->get_custom_field( 'instructions' );
	}
	
	public function get_preparation_time() {
		return $this->get_custom_field( 'preparation_time' );
	}

	public function get_cooking_time() {
		return $this->get_custom_field( 'cooking_time' );
	}
	
	public function get_serving() {
		return $this->get_custom_field( 'serving' );
	}
	
	public function get_difficulty() {
		$terms = wp_get_post_terms($this->get_base_id(), 'recipe_difficulty', array('orderby' => 'name', 'order' => 'ASC', 'fields' => 'all'));	
		$recipe_difficulty = null;
		if (count($terms) > 0) {	
			$recipe_difficulty = $terms[0];
		}
		return $recipe_difficulty;
	}

	public function get_difficulty_id() {
		$difficulty = $this->get_difficulty();
		return isset($difficulty) ? $difficulty->term_id : 0;
	}
	
	public function get_meal_course() {
		$terms = wp_get_post_terms($this->get_base_id(), 'recipe_meal_course', array('orderby' => 'name', 'order' => 'ASC', 'fields' => 'all'));	
		$meal_course = null;
		if (count($terms) > 0) {	
			$meal_course = $terms[0];
		}
		return $meal_course;
	}

	public function get_meal_course_id() {
		$meal_course = $this->get_meal_course();
		return isset($meal_course) ? $meal_course->term_id : 0;
	}
	
	public function get_recipe_categories() {
		return wp_get_post_terms($this->get_base_id(), 'recipe_category', array('orderby' => 'name', 'order' => 'ASC', 'fields' => 'all'));	
	}
	
	public function get_author_nicename() {
		return get_the_author_meta('user_nicename', $this->post->post_author);
	}
	
	public function get_field_value($field_name, $use_prefix = true) {
		if ( $field_name == 'recipe_categories' ) {
			$category_ids = array();
			$categories = $this->get_recipe_categories();
			if ($categories && count($categories) > 0) {
				for( $i = 0; $i < count($categories); $i++) {
					$category = $categories[$i];
					$category_ids[] = $category->term_id;
				}
			}
			return $category_ids;
		} elseif ( $field_name == 'recipe_meal_course' ) {
			return $this->get_meal_course_id();
		} elseif ( $field_name == 'recipe_difficulty' )
			return $this->get_difficulty_id();
		elseif ( $field_name == 'post_title' )
			return $this->post->post_title;
		elseif ( $field_name == 'post_content' )
			return $this->post->post_content;
		else
			return $this->get_custom_field($field_name, $use_prefix);			
	}

}