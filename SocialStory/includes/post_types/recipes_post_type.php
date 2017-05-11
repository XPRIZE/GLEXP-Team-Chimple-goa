<?php

class SocialChef_Recipes_Post_Type extends SocialChef_BaseSingleton {

	private $enable_nutritional_elements;

	protected function __construct() {
	
		$this->enable_nutritional_elements = of_get_option('enable_nutritional_elements', 1);
        // our parent class might
        // contain shared code in its constructor
        parent::__construct();
    }

    public function init() {

		add_action( 'socialchef_initialize_post_types', array( $this, 'initialize_post_type' ));
		add_action( 'admin_init', array($this, 'remove_unnecessary_meta_boxes') );
		add_filter('manage_edit-recipe_columns', array( $this, 'manage_edit_recipe_columns'), 10, 1);	
		
		add_action( 'ingredient_unit_add_form_fields', array($this, 'ingredient_unit_add_new_meta_fields') );
		add_action( 'ingredient_unit_edit_form_fields', array($this, 'ingredient_unit_edit_meta_fields'), 10, 2 );
		add_action( 'edited_ingredient_unit', array($this, 'save_ingredient_unit_custom_meta'), 10, 2 );  
		add_action( 'create_ingredient_unit', array($this, 'save_ingredient_unit_custom_meta'), 10, 2 );
		add_action( 'meta_box_delete_post_meta',  array($this, 'delete_ingredients'), 10, 2);
		add_action( 'meta_box_update_post_meta',  array($this, 'save_ingredients'), 10, 3);

		if ($this->enable_nutritional_elements) {		
			add_action( 'nutritional_unit_add_form_fields', array($this, 'nutritional_unit_add_new_meta_fields') );
			add_action( 'nutritional_unit_edit_form_fields', array($this, 'nutritional_unit_edit_meta_fields'), 10, 2 );
			add_action( 'edited_nutritional_unit', array($this, 'save_nutritional_unit_custom_meta'), 10, 2 );  
			add_action( 'create_nutritional_unit', array($this, 'save_nutritional_unit_custom_meta'), 10, 2 );
			add_action( 'meta_box_delete_post_meta',  array($this, 'delete_nutritional_elements'), 10, 2);
			add_action( 'meta_box_update_post_meta',  array($this, 'save_nutritional_elements'), 10, 3);			
		}
		
		add_action( 'recipe_category_add_form_fields', array($this, 'recipe_category_add_new_meta_fields') );
		add_action( 'recipe_category_edit_form_fields', array($this, 'recipe_category_edit_meta_fields'), 10, 2 );
		add_action( 'edited_recipe_category', array($this, 'save_recipe_category_custom_meta'), 10, 2 );  
		add_action( 'create_recipe_category', array($this, 'save_recipe_category_custom_meta'), 10, 2 );

    }
	
	function list_recipe_ingredients($post_id) {
		
		global $wpdb;
		
		$sql = "SELECT * FROM " .  SOCIALCHEF_RECIPE_INGREDIENTS_TABLE . "
				WHERE recipe_post_id = %d";
		
		return $wpdb->get_results($wpdb->prepare($sql, $post_id));		
	}
	
	function delete_ingredients($post_id, $field) {
		global $wpdb;
		
		$sql = "DELETE FROM " . SOCIALCHEF_RECIPE_INGREDIENTS_TABLE . "
				WHERE recipe_post_id = %d ";
				
		$wpdb->query($wpdb->prepare($sql, $post_id));
	}
	
	function save_ingredients($post_id, $field, $new) {
		global $wpdb;
		
		if ( count($new) > 0 ) {
		
			$deleted = false;
		
			if(is_array($new))   {
				
				foreach ($new as $new_entry) {
					
					if (isset($new_entry['amount']) && isset($new_entry['ingredient']) && isset($new_entry['ingredient_unit'])) {
					
						if (!$deleted) {							
							
							$this->clear_recipe_ingredients($post_id);
							wp_delete_object_term_relationships($post_id, array('ingredient'));						
							$deleted = true;
						}
					
						$amount = $new_entry['amount'];
						$amount = floatval(str_replace(',', '.', $amount));
						
						$ingredient_term_slug = $new_entry['ingredient'];
						$ingredient_unit_term_slug = $new_entry['ingredient_unit'];
						
						$ingredient_term_id = 0;
						$ingredient_unit_term_id = 0;
						
						if (!empty($ingredient_term_slug)) {
							$term1 = get_term_by( 'slug', $ingredient_term_slug, 'ingredient' );
							if ($term1) {
								$ingredient_term_id = (int)$term1->term_id;
							}
						}
						if (!empty($ingredient_unit_term_slug)) {
							$term2 = get_term_by( 'slug', $ingredient_unit_term_slug, 'ingredient_unit' );
							if ($term2) {
								$ingredient_unit_term_id = (int)$term2->term_id;
							}
						}
						
						if ($ingredient_term_id > 0 && $ingredient_unit_term_id) {
							$this->save_recipe_ingredient($post_id, $ingredient_term_id, $ingredient_unit_term_id, $amount);
						}
					}
				}
			}
		}		

	}
	
	public function clear_recipe_ingredients($post_id) {
		
		global $wpdb;
		$sql = "DELETE FROM " . SOCIALCHEF_RECIPE_INGREDIENTS_TABLE . "
				WHERE recipe_post_id = %d ";
				
		$wpdb->query($wpdb->prepare($sql, $post_id));
	}
	
	public function save_recipe_ingredient($post_id, $ingredient_term_id, $ingredient_unit_term_id, $amount) {
		
		global $wpdb;
		
		$sql = "INSERT INTO " . SOCIALCHEF_RECIPE_INGREDIENTS_TABLE . "
				(recipe_post_id, ingredient_term_id, ingredient_unit_term_id, amount)
				VALUES
				(%d, %d, %d, %f);";
		
		$wpdb->query($wpdb->prepare($sql, $post_id, $ingredient_term_id, $ingredient_unit_term_id, $amount));
		
		wp_set_object_terms($post_id, $ingredient_term_id, 'ingredient', true);
	}
	
	function list_recipe_nutritional_elements($post_id) {
		
		global $wpdb;
		
		$sql = "SELECT * FROM " . SOCIALCHEF_RECIPE_NUTRITIONAL_ELEMENTS_TABLE . "
				WHERE recipe_post_id = %d";
		
		return $wpdb->get_results($wpdb->prepare($sql, $post_id));		
	}
	
	function delete_nutritional_elements($post_id, $field) {
		global $wpdb;
		
		$sql = "DELETE FROM " . SOCIALCHEF_RECIPE_NUTRITIONAL_ELEMENTS_TABLE . "
				WHERE recipe_post_id = %d ";
				
		$wpdb->query($wpdb->prepare($sql, $post_id));
	}
		
	function clear_recipe_nutritional_elements($post_id) {
		
		global $wpdb;
		$sql = "DELETE FROM " . SOCIALCHEF_RECIPE_NUTRITIONAL_ELEMENTS_TABLE . "
				WHERE recipe_post_id = %d ";
				
		$wpdb->query($wpdb->prepare($sql, $post_id));
	}
	
	function save_recipe_nutritional_element($post_id, $nutritional_element_term_id, $nutritional_unit_term_id, $amount) {
		
		global $wpdb;
		$sql = "INSERT INTO " . SOCIALCHEF_RECIPE_NUTRITIONAL_ELEMENTS_TABLE . "
				(recipe_post_id, nutritional_element_term_id, nutritional_unit_term_id, amount)
				VALUES
				(%d, %d, %d, %f);";

		$wpdb->query($wpdb->prepare($sql, $post_id, $nutritional_element_term_id, $nutritional_unit_term_id, $amount));
		wp_set_object_terms($post_id, $nutritional_element_term_id, 'nutritional_element', true);
	}
	
	function save_nutritional_elements($post_id, $field, $new) {
		global $wpdb;

		$deleted = false;
		
		if ( count($new) > 0 ) {
		
			if(is_array($new))   {
				foreach ($new as $new_entry) {

					if (isset($new_entry['amount']) && isset($new_entry['nutritional_element']) && isset($new_entry['nutritional_unit'])) {
					
						if (!$deleted) {

							$this->clear_recipe_nutritional_elements($post_id);
							
							wp_delete_object_term_relationships($post_id, array('nutritional_element'));						
							$deleted = true;
						}

						$amount = $new_entry['amount'];
						$amount = floatval(str_replace(',', '.', $amount));
						
						$nutritional_element_term_slug = $new_entry['nutritional_element'];
						$nutritional_unit_term_slug = $new_entry['nutritional_unit'];

						$nutritional_element_term_id = 0;
						$nutritional_unit_term_id = 0;

						if (!empty($nutritional_element_term_slug)) {
							$term1 = get_term_by( 'slug', $nutritional_element_term_slug, 'nutritional_element' );
							if ($term1) {
								$nutritional_element_term_id = (int)$term1->term_id;
							}
						}
						if (!empty($nutritional_unit_term_slug)) {
							$term2 = get_term_by( 'slug', $nutritional_unit_term_slug, 'nutritional_unit' );
							if ($term2) {
								$nutritional_unit_term_id = (int)$term2->term_id;
							}
						}

						if ($nutritional_unit_term_id > 0 && $nutritional_element_term_id > 0) {
							$this->save_recipe_nutritional_element($post_id, $nutritional_element_term_id, $nutritional_unit_term_id, $amount);
						}
					}
				}
			}
		}
	}
	
	function initialize_post_type() {
	
		$this->create_post_type_recipe();
		$this->create_meal_course_taxonomy();
		$this->create_recipe_category_taxonomy();
		$this->create_recipe_difficulty_taxonomy();
		$this->create_ingredient_taxonomy();
		$this->create_ingredient_unit_taxonomy();
		
		if ($this->enable_nutritional_elements) {
			$this->create_nutritional_element_taxonomy();
			$this->create_nutritional_unit_taxonomy();
		}
		
		$this->create_extra_tables();
		
	}
	
	function create_extra_tables() {
		
		global $sc_installed_version;
		
		if ($sc_installed_version != SOCIALCHEF_VERSION) {

			require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
		
			$table_name = SOCIALCHEF_RECIPE_INGREDIENTS_TABLE;
			
			$sql = "CREATE TABLE " . $table_name . " (
						id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
						recipe_post_id bigint(20) NOT NULL,
						ingredient_term_id bigint(20) NOT NULL,
						ingredient_unit_term_id bigint(20) NOT NULL,
						amount decimal(8,2) NOT NULL,
						PRIMARY KEY  (id)
					);";

			dbDelta($sql);
			
			if ($this->enable_nutritional_elements) {			
			
				$table_name = SOCIALCHEF_RECIPE_NUTRITIONAL_ELEMENTS_TABLE;
				
				$sql = "CREATE TABLE " . $table_name . " (
							id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
							recipe_post_id bigint(20) NOT NULL,
							nutritional_element_term_id bigint(20) NOT NULL,
							nutritional_unit_term_id bigint(20) NOT NULL,
							amount decimal(8,2) NOT NULL,
							PRIMARY KEY  (id)
						);";

				dbDelta($sql);
				
			}
		}
	}
	
	function create_post_type_recipe() {
		
		global $sc_theme_globals;
		
		$recipes_permalink_slug = $sc_theme_globals->get_recipes_permalink_slug();
			
		$labels = array(
			'name'                => __( 'Stories', 'Post Type General Name', 'socialchef' ),
			'singular_name'       => __( 'Story', 'Post Type Singular Name', 'socialchef' ),
			'menu_name'           => __( 'Stories', 'socialchef' ),
			'all_items'           => __( 'All Stories', 'socialchef' ),
			'view_item'           => __( 'View Story', 'socialchef' ),
			'add_new_item'        => __( 'Add New Story', 'socialchef' ),
			'add_new'             => __( 'New Stories', 'socialchef' ),
			'edit_item'           => __( 'Edit Stories', 'socialchef' ),
			'update_item'         => __( 'Update Stories', 'socialchef' ),
			'search_items'        => __( 'Search Stories', 'socialchef' ),
			'not_found'           => __( 'No Stories found', 'socialchef' ),
			'not_found_in_trash'  => __( 'No Stories found in Trash', 'socialchef' ),
		);
		$args = array(
			'label'               => __( 'recipe', 'socialchef' ),
			'description'         => __( 'Story information pages', 'socialchef' ),
			'labels'              => $labels,
			'supports'            => array( 'title', 'editor', 'thumbnail', 'author', 'excerpt', 'comments' ),
			'taxonomies'          => array( ),
			'hierarchical'        => false,
			'public'              => true,
			'show_ui'             => true,
			'show_in_menu'        => true,
			'show_in_nav_menus'   => true,
			'show_in_admin_bar'   => true,
			'can_export'          => true,
			'has_archive'         => false,
			'exclude_from_search' => false,
			'publicly_queryable'  => true,
			'capability_type'     => 'page',
			'rewrite' => array('slug' => $recipes_permalink_slug),
		);
		
		register_post_type( 'recipe', $args );	
	}
	
	function create_meal_course_taxonomy(){
	
		global $sc_theme_globals;
		
		$meal_course_permalink_slug = $sc_theme_globals->get_meal_course_permalink_slug();
		
		$labels = array(
				'name'              			=> __( 'Meal course', 'taxonomy general name', 'socialchef' ),
				'singular_name'     			=> __( 'Meal course', 'taxonomy singular name', 'socialchef' ),
				'search_items'      			=> __( 'Search Meal courses', 'socialchef' ),
				'all_items'         			=> __( 'All Meal courses', 'socialchef' ),
				'parent_item'                	=> null,
				'parent_item_colon'          	=> null,
				'edit_item'        			 	=> __( 'Edit Meal course', 'socialchef' ),
				'update_item'       			=> __( 'Update Meal course', 'socialchef' ),
				'add_new_item'      			=> __( 'Add New Meal course', 'socialchef' ),
				'new_item_name'     			=> __( 'New Meal course Name', 'socialchef' ),
				'separate_items_with_commas' 	=> __( 'Separate meal courses with commas', 'socialchef' ),
				'add_or_remove_items'        	=> __( 'Add or remove meal courses', 'socialchef' ),
				'choose_from_most_used'      	=> __( 'Choose from the most used meal courses', 'socialchef' ),
				'not_found'                  	=> __( 'No meal courses found.', 'socialchef' ),
				'menu_name'         			=> __( 'Meal course', 'socialchef' ),
			);
			
		$args = array(
				'hierarchical'      			=> false,
				'labels'            			=> $labels,
				'show_ui'           			=> true,
				'show_admin_column' 			=> true,
				'query_var'         			=> true,
				'update_count_callback' 		=> '_update_post_term_count',
				'rewrite'           			=> array( 'slug' => $meal_course_permalink_slug ),
			);
		
		register_taxonomy( 'recipe_meal_course', array( 'recipe' ), $args );
	}
	
	function create_recipe_category_taxonomy() {
	
		global $sc_theme_globals;
		
		$recipe_category_permalink_slug = $sc_theme_globals->get_recipe_category_permalink_slug();

		$labels = array(
				'name'              			=> __( 'Categories', 'taxonomy general name', 'socialchef' ),
				'singular_name'     			=> __( 'Category', 'taxonomy singular name', 'socialchef' ),
				'search_items'      			=> __( 'Search categories', 'socialchef' ),
				'all_items'         			=> __( 'All categories', 'socialchef' ),
				'parent_item'                	=> null,
				'parent_item_colon'          	=> null,
				'edit_item'         			=> __( 'Edit Category', 'socialchef' ),
				'update_item'       			=> __( 'Update Category', 'socialchef' ),
				'add_new_item'      			=> __( 'Add New Category', 'socialchef' ),
				'new_item_name'     			=> __( 'New Category Name', 'socialchef' ),
				'separate_items_with_commas'	=> __( 'Separate categories with commas', 'socialchef' ),
				'add_or_remove_items'       	=> __( 'Add or remove categories', 'socialchef' ),
				'choose_from_most_used'      	=> __( 'Choose from the most used categories', 'socialchef' ),
				'not_found'                  	=> __( 'No categories found.', 'socialchef' ),
				'menu_name'        				=> __( 'Categories', 'socialchef' ),
			);
			
		$args = array(
				'hierarchical'      			=> false,
				'labels'            			=> $labels,
				'show_ui'           			=> true,
				'show_admin_column' 			=> true,
				'query_var'         			=> true,
				'update_count_callback' 		=> '_update_post_term_count',
				'rewrite'           			=> array( 'slug' => $recipe_category_permalink_slug ),
			);
		
		register_taxonomy( 'recipe_category', array( 'recipe' ), $args );
	}

	function create_recipe_difficulty_taxonomy(){
	
		global $sc_theme_globals;
		
		$difficulty_permalink_slug = $sc_theme_globals->get_difficulty_permalink_slug();
		
		$labels = array(
				'name'              			=> __( 'Difficulty', 'taxonomy general name', 'socialchef' ),
				'singular_name'     			=> __( 'Difficulty', 'taxonomy singular name', 'socialchef' ),
				'search_items'      			=> __( 'Search Difficulties', 'socialchef' ),
				'all_items'        				=> __( 'All Difficulties', 'socialchef' ),
				'parent_item'                	=> null,
				'parent_item_colon'          	=> null,
				'edit_item'         			=> __( 'Edit Difficulty', 'socialchef' ),
				'update_item'       			=> __( 'Update Difficulty', 'socialchef' ),
				'add_new_item'      			=> __( 'Add New Difficulty', 'socialchef' ),
				'new_item_name'     			=> __( 'New Difficulty Name', 'socialchef' ),
				'separate_items_with_commas' 	=> __( 'Separate difficulties with commas', 'socialchef' ),
				'add_or_remove_items'        	=> __( 'Add or remove difficulties', 'socialchef' ),
				'choose_from_most_used'      	=> __( 'Choose from the most used difficulties', 'socialchef' ),
				'not_found'                  	=> __( 'No difficulties found.', 'socialchef' ),
				'menu_name'         			=> __( 'Difficulty', 'socialchef' ),
			);
			
		$args = array(
				'hierarchical'      			=> false,
				'labels'            			=> $labels,
				'show_ui'           			=> true,
				'show_admin_column' 			=> true,
				'query_var'         			=> true,
				'update_count_callback' 		=> '_update_post_term_count',
				'rewrite'           			=> array( 'slug' => $difficulty_permalink_slug ),
			);
		
		register_taxonomy( 'recipe_difficulty', array( 'recipe' ), $args );
	}
	
	function create_ingredient_taxonomy() {
	
		global $sc_theme_globals;
		
		$ingredient_permalink_slug = $sc_theme_globals->get_ingredient_permalink_slug();
		
		$labels = array(
				'name'              			=> __( 'Ingredients', 'taxonomy general name', 'socialchef' ),
				'singular_name'     			=> __( 'Ingredient', 'taxonomy singular name', 'socialchef' ),
				'search_items'      			=> __( 'Search Ingredients', 'socialchef' ),
				'all_items'         			=> __( 'All Ingredients', 'socialchef' ),
				'parent_item'                	=> null,
				'parent_item_colon'          	=> null,
				'edit_item'         			=> __( 'Edit Ingredient', 'socialchef' ),
				'update_item'       			=> __( 'Update Ingredient', 'socialchef' ),
				'add_new_item'      			=> __( 'Add New Ingredient', 'socialchef' ),
				'new_item_name'     			=> __( 'New Ingredient Name', 'socialchef' ),
				'separate_items_with_commas' 	=> __( 'Separate ingredients with commas', 'socialchef' ),
				'add_or_remove_items'        	=> __( 'Add or remove ingredients', 'socialchef' ),
				'choose_from_most_used'      	=> __( 'Choose from the most used ingredients', 'socialchef' ),
				'not_found'                  	=> __( 'No ingredients found.', 'socialchef' ),
				'menu_name'         			=> __( 'Ingredients', 'socialchef' ),
			);
			
		$args = array(
				'hierarchical'      			=> false,
				'labels'            			=> $labels,
				'show_ui'           			=> true,
				'show_admin_column' 			=> true,
				'query_var'         			=> true,
				'update_count_callback' 		=> '_update_post_term_count',
				'rewrite'           			=> array( 'slug' => $ingredient_permalink_slug ),
			);
		
		register_taxonomy( 'ingredient', array( 'recipe' ), $args );
	}
	
	function create_ingredient_unit_taxonomy(){
	
		$labels = array(
				'name'              			=> __( 'Ingredient Units', 'taxonomy general name', 'socialchef' ),
				'singular_name'     			=> __( 'Ingredient Unit', 'taxonomy singular name', 'socialchef' ),
				'search_items'      			=> __( 'Search Ingredient Units', 'socialchef' ),
				'all_items'         			=> __( 'All Ingredient Units', 'socialchef' ),
				'parent_item'                	=> null,
				'parent_item_colon'          	=> null,
				'edit_item'         			=> __( 'Edit Ingredient Unit', 'socialchef' ),
				'update_item'       			=> __( 'Update Ingredient Unit', 'socialchef' ),
				'add_new_item'      			=> __( 'Add New Ingredient Unit', 'socialchef' ),
				'new_item_name'     			=> __( 'New Ingredient Unit Name', 'socialchef' ),
				'separate_items_with_commas' 	=> __( 'Separate ingredient units with commas', 'socialchef' ),
				'add_or_remove_items'        	=> __( 'Add or remove ingredient units', 'socialchef' ),
				'choose_from_most_used'      	=> __( 'Choose from the most used ingredient units', 'socialchef' ),
				'not_found'                  	=> __( 'No ingredient units found.', 'socialchef' ),
				'menu_name'         			=> __( 'Ingredient Units', 'socialchef' ),
			);
			
		$args = array(
				'hierarchical'      			=> false,
				'labels'            			=> $labels,
				'show_ui'           			=> true,
				'show_admin_column' 			=> true,
				'query_var'         			=> true,
				'update_count_callback' 		=> '_update_post_term_count',
				'rewrite'           			=> false,
			);
		
		register_taxonomy( 'ingredient_unit', array( 'recipe' ), $args );
	}
	
	function create_nutritional_element_taxonomy() {
	
		global $sc_theme_globals;
		
		$nutritional_element_permalink_slug = $sc_theme_globals->get_nutritional_element_permalink_slug();
		
		$labels = array(
				'name'              			=> __( 'Nutritional elements', 'taxonomy general name', 'socialchef' ),
				'singular_name'     			=> __( 'Nutritional element', 'taxonomy singular name', 'socialchef' ),
				'search_items'      			=> __( 'Search Nutritional elements', 'socialchef' ),
				'all_items'         			=> __( 'All Nutritional elements', 'socialchef' ),
				'parent_item'                	=> null,
				'parent_item_colon'          	=> null,
				'edit_item'         			=> __( 'Edit Nutritional element', 'socialchef' ),
				'update_item'       			=> __( 'Update Nutritional element', 'socialchef' ),
				'add_new_item'      			=> __( 'Add New Nutritional element', 'socialchef' ),
				'new_item_name'     			=> __( 'New Nutritional element Name', 'socialchef' ),
				'separate_items_with_commas' 	=> __( 'Separate nutritional elements with commas', 'socialchef' ),
				'add_or_remove_items'        	=> __( 'Add or remove nutritional elements', 'socialchef' ),
				'choose_from_most_used'      	=> __( 'Choose from the most used nutritional elements', 'socialchef' ),
				'not_found'                  	=> __( 'No nutritional elements found.', 'socialchef' ),
				'menu_name'         			=> __( 'Nutritional elements', 'socialchef' ),
			);
			
		$args = array(
				'hierarchical'      			=> false,
				'labels'            			=> $labels,
				'show_ui'           			=> true,
				'show_admin_column' 			=> true,
				'query_var'         			=> true,
				'update_count_callback' 		=> '_update_post_term_count',
				'rewrite'           			=> array( 'slug' => $nutritional_element_permalink_slug ),
			);
		
		register_taxonomy( 'nutritional_element', array( 'recipe' ), $args );
	}
		
	function create_nutritional_unit_taxonomy(){
	
		$labels = array(
				'name'              			=> __( 'Nutritional Units', 'taxonomy general name', 'socialchef' ),
				'singular_name'     			=> __( 'Nutritional Unit', 'taxonomy singular name', 'socialchef' ),
				'search_items'      			=> __( 'Search Nutritional Units', 'socialchef' ),
				'all_items'         			=> __( 'All Nutritional Units', 'socialchef' ),
				'parent_item'                	=> null,
				'parent_item_colon'          	=> null,
				'edit_item'         			=> __( 'Edit Nutritional Unit', 'socialchef' ),
				'update_item'       			=> __( 'Update Nutritional Unit', 'socialchef' ),
				'add_new_item'      			=> __( 'Add New Nutritional Unit', 'socialchef' ),
				'new_item_name'     			=> __( 'New Nutritional Unit Name', 'socialchef' ),
				'separate_items_with_commas' 	=> __( 'Separate nutritional units with commas', 'socialchef' ),
				'add_or_remove_items'        	=> __( 'Add or remove nutritional units', 'socialchef' ),
				'choose_from_most_used'      	=> __( 'Choose from the most used nutritional units', 'socialchef' ),
				'not_found'                  	=> __( 'No nutritional units found.', 'socialchef' ),
				'menu_name'         			=> __( 'Nutritional Units', 'socialchef' ),
			);
			
		$args = array(
				'hierarchical'      			=> false,
				'labels'            			=> $labels,
				'show_ui'           			=> true,
				'show_admin_column' 			=> true,
				'query_var'         			=> true,
				'update_count_callback' 		=> '_update_post_term_count',
				'rewrite'           			=> false,
			);
		
		register_taxonomy( 'nutritional_unit', array( 'recipe' ), $args );
	}

	function manage_edit_recipe_columns($columns) {
	
		unset($columns['taxonomy-ingredient']);
		unset($columns['taxonomy-ingredient_unit']);
		unset($columns['taxonomy-nutritional_element']);
		unset($columns['taxonomy-nutritional_unit']);

		return $columns;
	}

	function remove_unnecessary_meta_boxes() {
	
		remove_meta_box('tagsdiv-recipe_meal_course', 'recipe', 'side');
		remove_meta_box('tagsdiv-recipe_difficulty', 'recipe', 'side');
		remove_meta_box('tagsdiv-ingredient', 'recipe', 'side');
		remove_meta_box('tagsdiv-ingredient_unit', 'recipe', 'side');
		
		if ($this->enable_nutritional_elements) {
		
			remove_meta_box('tagsdiv-nutritional_element', 'recipe', 'side');
			remove_meta_box('tagsdiv-nutritional_unit', 'recipe', 'side');
			
		}		
	}
	
	function recipe_category_add_new_meta_fields() { 
		global $sc_default_recipe_category_css_classes;
	?>
		<tr class="form-field form-required">
			<th scope="row"><label for="term_meta[recipe_category_css_class]"><?php _e( 'Css class', 'socialchef' ); ?></label></th>
			<td>
			<select name="term_meta[recipe_category_css_class]" id="term_meta[recipe_category_css_class]">
			<?php
				foreach ($sc_default_recipe_category_css_classes as $css_class) {
					echo "<option value='$css_class'>$css_class</option>";
				}
			?>
			</select>
			<p class="description"><?php _e( 'What is the css class used by this category in order to display appropriate category icon in front end','socialchef' ); ?></p></td>
		</tr>
	<?php
	}
	
	function recipe_category_edit_meta_fields($term) {
	
		global $sc_default_recipe_category_css_classes;
	
		// put the term ID into a variable
		$t_id = $term->term_id;
		
		// retrieve the existing value(s) for this meta field. This returns an array
		$term_meta = get_option( "taxonomy_$t_id" );
	?>
		<tr class="form-field form-required">
			<th scope="row"><label for="term_meta[recipe_category_css_class]"><?php _e( 'Css class', 'socialchef' ); ?></label></th>
			<td>
			<select name="term_meta[recipe_category_css_class]" id="term_meta[recipe_category_css_class]">
			<?php
				$selected_css_class = isset($term_meta['recipe_category_css_class']) ? $term_meta['recipe_category_css_class'] : '';		
				foreach ($sc_default_recipe_category_css_classes as $css_class) {
					if ($selected_css_class == $css_class)
						echo "<option selected='selected' value='$css_class'>$css_class</option>";
					else
						echo "<option value='$css_class'>$css_class</option>";
				}
			?>
			</select>
			<p class="description"><?php _e( 'What is the css class used by this category in order to display appropriate category icon in front end','socialchef' ); ?></p></td>
		</tr>
	<?php
	}	
	
	function save_recipe_category_custom_meta( $term_id ) {
		if ( isset( $_POST['term_meta'] ) ) {
			$t_id = $term_id;
			$term_meta = get_option( "taxonomy_$t_id" );
			$cat_keys = array_keys( $_POST['term_meta'] );
			foreach ( $cat_keys as $key ) {
				if ( isset ( $_POST['term_meta'][$key] ) ) {
					$term_meta[$key] = $_POST['term_meta'][$key];
				}
			}
			// Save the option array.
			update_option( "taxonomy_$t_id", $term_meta );
		}
	} 
	
	function ingredient_unit_add_new_meta_fields() { 
	?>
		<tr class="form-field form-required">
			<th scope="row"><label for="term_meta[ingredient_unit_abbreviation]"><?php _e( 'Abbreviation', 'socialchef' ); ?></label></th>
			<td><input type="text" value="" name="term_meta[ingredient_unit_abbreviation]" id="term_meta[ingredient_unit_abbreviation]" />
			<p class="description"><?php _e( 'What is the abbreviation (short form) of your unit','socialchef' ); ?></p></td>
		</tr>
	<?php
	}
	
	function ingredient_unit_edit_meta_fields($term) {
		// put the term ID into a variable
		$t_id = $term->term_id;
		
		// retrieve the existing value(s) for this meta field. This returns an array
		$term_meta = get_option( "taxonomy_$t_id" );
	?>
		<tr class="form-field form-required">
			<th scope="row"><label for="term_meta[ingredient_unit_abbreviation]"><?php _e( 'Abbreviation', 'socialchef' ); ?></label></th>
			<td><input type="text" value="<?php echo isset($term_meta['ingredient_unit_abbreviation']) ? $term_meta['ingredient_unit_abbreviation'] : ''; ?>" name="term_meta[ingredient_unit_abbreviation]" id="term_meta[ingredient_unit_abbreviation]" />
			<p class="description"><?php _e( 'What is the abbreviation (short form) of your unit','socialchef' ); ?></p></td>
		</tr>
	<?php
	}	

	function save_ingredient_unit_custom_meta( $term_id ) {
		if ( isset( $_POST['term_meta'] ) ) {
			$t_id = $term_id;
			$term_meta = get_option( "taxonomy_$t_id" );
			$cat_keys = array_keys( $_POST['term_meta'] );
			foreach ( $cat_keys as $key ) {
				if ( isset ( $_POST['term_meta'][$key] ) ) {
					$term_meta[$key] = $_POST['term_meta'][$key];
				}
			}
			// Save the option array.
			update_option( "taxonomy_$t_id", $term_meta );
		}
	}  

	function nutritional_unit_add_new_meta_fields() { 
	?>
		<tr class="form-field form-required">
			<th scope="row"><label for="term_meta[nutritional_unit_abbreviation]"><?php _e( 'Abbreviation', 'socialchef' ); ?></label></th>
			<td><input type="text" value="" name="term_meta[nutritional_unit_abbreviation]" id="term_meta[nutritional_unit_abbreviation]" />
			<p class="description"><?php _e( 'What is the abbreviation (short form) of your unit','socialchef' ); ?></p></td>
		</tr>
	<?php
	}
	
	function nutritional_unit_edit_meta_fields($term) {
		// put the term ID into a variable
		$t_id = $term->term_id;
		
		// retrieve the existing value(s) for this meta field. This returns an array
		$term_meta = get_option( "taxonomy_$t_id" );
	?>
		<tr class="form-field form-required">
			<th scope="row"><label for="term_meta[nutritional_unit_abbreviation]"><?php _e( 'Abbreviation', 'socialchef' ); ?></label></th>
			<td><input type="text" value="<?php echo isset($term_meta['nutritional_unit_abbreviation']) ? $term_meta['nutritional_unit_abbreviation'] : ''; ?>" name="term_meta[nutritional_unit_abbreviation]" id="term_meta[nutritional_unit_abbreviation]" />
			<p class="description"><?php _e( 'What is the abbreviation (short form) of your unit','socialchef' ); ?></p></td>
		</tr>
	<?php
	}	

	function save_nutritional_unit_custom_meta( $term_id ) {
		if ( isset( $_POST['term_meta'] ) ) {
			$t_id = $term_id;
			$term_meta = get_option( "taxonomy_$t_id" );
			$cat_keys = array_keys( $_POST['term_meta'] );
			foreach ( $cat_keys as $key ) {
				if ( isset ( $_POST['term_meta'][$key] ) ) {
					$term_meta[$key] = $_POST['term_meta'][$key];
				}
			}
			// Save the option array.
			update_option( "taxonomy_$t_id", $term_meta );
		}
	} 
	
	function list_random_ingredients() {
		$iargs = array(
			'orderby'           => 'name', 
			'order'             => 'ASC',
			'hide_empty'        => true,
			'number'            => 20
		);	
		add_filter('get_terms_orderby',  array($this, 'random_terms_orderby') );

		$ingredient_terms = get_terms( array('ingredient'), $iargs );	

		remove_filter('get_terms_orderby', array($this, 'random_terms_orderby') );
		return $ingredient_terms;
	}
	
	function random_terms_orderby() {
		return "RAND()";
	}	
	
	function list_recipes( $paged = 0, $per_page = -1, $orderby = '', $order = '', $meal_course_ids = array(), $difficulty_ids = array(), $category_ids = array(), $search_args = array(), $ingredient_ids = array(), $featured_only = false, $author_id = null, $include_private = false, $recipe_ids = array() ) {

		$args = array(
			'post_type'         => 'recipe',
			'post_status'       => array('publish'),
			'posts_per_page'    => $per_page,
			'paged' 			=> $paged, 
			'orderby'           => $orderby,
			'suppress_filters' 	=> false,
			'order'				=> $order,
			'meta_query'        => array('relation' => 'AND')
		);
		
		if (count($recipe_ids) > 0) {
			$args['post__in'] = $recipe_ids;
		}
		
		if (isset($featured_only) && $featured_only) {
			$args['meta_query'][] = array(
				'key'       => 'recipe_is_featured',
				'value'     => 1,
				'compare'   => '=',
				'type' => 'numeric'
			);
		}
		
		if (isset($search_args['keyword']) && strlen($search_args['keyword']) > 0) {
			$args['s'] = $search_args['keyword'];
		}
		
		if (isset($author_id)) {
			$author_id = intval($author_id);
			if ($author_id > 0) {
				$args['author'] = $author_id;
			}
		}
		
		if ($include_private) {
			$args['post_status'][] = 'private';
		}
		
		$tax_query = array();
		if (!empty($meal_course_ids)) {
			 $tax_query[] =	array(
					'taxonomy' => 'recipe_meal_course',
					'field' => 'term_id',
					'terms' => $meal_course_ids,
					'operator'=> 'IN'
			);
		}
		
		if (!empty($difficulty_ids)) {
			$tax_query[] = array(
					'taxonomy' => 'recipe_difficulty',
					'field' => 'term_id',
					'terms' => $difficulty_ids,
					'operator'=> 'IN'
			);
		}
		
		if (!empty($category_ids)) {
			$tax_query[] = array(
					'taxonomy' => 'recipe_category',
					'field' => 'term_id',
					'terms' => $category_ids,
					'operator'=> 'IN'
			);
		}
		
		if (!empty($ingredient_ids)) {
			$tax_query[] = array(
					'taxonomy' => 'ingredient',
					'field' => 'term_id',
					'terms' => $ingredient_ids,
					'operator'=> 'IN'
			);
		}
		
		$meta_query = array();
		if ( isset($search_args['serving']) && strlen($search_args['serving']) > 0 ) {
			$serving = intval($search_args['serving']);
			if ($serving > 0 & $serving <=5) {
				$meta_query[] = array(
					'key'       => 'recipe_serving',
					'value'     => $serving,
					'compare'   => '=',
					'type' => 'numeric'
				);
			}
		}
		
		if ( isset($search_args['preparation_time']) && strlen($search_args['preparation_time']) > 0 ) {
			$preparation_time = intval($search_args['preparation_time']);
			if ($preparation_time > 0 & $preparation_time <=180) {
				$meta_query[] = array(
					'key'       => 'recipe_preparation_time',
					'value'     => $preparation_time,
					'compare'   => '<=',
					'type' => 'numeric'
				);
			}
		}
		
		if ( isset($search_args['cooking_time']) && strlen($search_args['cooking_time']) > 0 ) {
			$cooking_time = intval($search_args['cooking_time']);
			if ($cooking_time > 0 & $cooking_time <=180) {
				$meta_query[] = array(
					'key'       => 'recipe_cooking_time',
					'value'     => $cooking_time,
					'compare'   => '<=',
					'type' => 'numeric'
				);
			}
		}
		
		if (count($tax_query) > 0) {
			$args['tax_query'] = $tax_query;
		}
		
		if (count($meta_query) > 0) {
			$args['meta_query'] = $meta_query;
		}
	
		if (isset($search_args['keyword']) && strlen($search_args['keyword']) > 0) {
			$args['s'] = $search_args['keyword'];
		}
		
		$posts_query = new WP_Query($args);	
		$recipes = array();
			
		if ($posts_query->have_posts() ) {
			while ( $posts_query->have_posts() ) {
				global $post;
				$posts_query->the_post(); 
				$recipes[] = $post;
			}
		}
		
		$results = array(
			'total' => $posts_query->found_posts,
			'results' => $recipes
		);
		
		wp_reset_postdata();
		
		return $results;
	}
	
	function mark_as_favorite($user_id, $recipe_id) {		
	
		if (!$this->is_marked_as_favorite($user_id, $recipe_id)) {
		
			$favorite_ids = $this->list_user_favorites($user_id);
			
			if (!$favorite_ids)
				$favorite_ids = array();
				
			$favorite_ids[] = $recipe_id;	
			
			update_user_meta( $user_id, SOCIALCHEF_FAVORITE_RECIPES, $favorite_ids );		
			
			$count = $this->get_favorited_count($recipe_id);
			if (!$count)
				$count = 0;
			$count++;
			
			update_post_meta($recipe_id, SOCIALCHEF_FAVORITE_RECIPES, $count);

		}
		return 0;
	}
	
	function unmark_as_favorite($user_id, $recipe_id) {		
	
		if ($this->is_marked_as_favorite($user_id, $recipe_id)) {
		
			$favorite_ids = $this->list_user_favorites($user_id);
			
			if (!$favorite_ids)
				return 0;
				
			if(($key = array_search($recipe_id, $favorite_ids)) !== false) {
				unset($favorite_ids[$key]);
			}
			
			update_user_meta( $user_id, SOCIALCHEF_FAVORITE_RECIPES, $favorite_ids );		
			
			$count = $this->get_favorited_count($recipe_id);
			if (!$count)
				$count = 0;
			else
				$count--;
			
			update_post_meta($recipe_id, SOCIALCHEF_FAVORITE_RECIPES, $count);

		}
		return 0;
	}
	
	function is_marked_as_favorite($user_id, $recipe_id) {
		
		$favorite_ids = $this->list_user_favorites($user_id);
		
		if ($favorite_ids) {
			foreach ($favorite_ids as $favorite_id) {
				if ($recipe_id == $favorite_id) 
					return true;
			}
		}
		return false;
	}
	
	function list_user_favorites( $user_id ) {	
	
		return get_user_meta($user_id, SOCIALCHEF_FAVORITE_RECIPES, true);	
	}
	
	function get_favorited_count ( $recipe_id ) {
	
		$count = get_post_meta($recipe_id, SOCIALCHEF_FAVORITE_RECIPES, true);
		if (!$count) 
			$count = 0;
		
		return $count;		
	}
		
	function list_most_favorited( $limit = 5 ) {
	
		global $wpdb;
		
		$query =  "SELECT post_id, meta_value, post_status FROM $wpdb->postmeta";
		$query .= "LEFT JOIN $wpdb->posts ON post_id = $wpdb->posts.ID";
		$query .= "WHERE post_status='publish' AND post_type='recipe' AND meta_key='" . SOCIALCHEF_FAVORITE_RECIPES . "'";
		$query .= " AND (meta_value+0) > 0 ORDER BY ROUND(meta_value) DESC LIMIT 0, $limit ";
		
		return $wpdb->get_results($query);		
	}
	
}

// store the instance in a variable to be retrieved later and call init
global $sc_recipes_post_type;
$sc_recipes_post_type = SocialChef_Recipes_Post_Type::get_instance();
$sc_recipes_post_type->init();
