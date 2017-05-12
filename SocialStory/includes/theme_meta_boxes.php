<?php

class SocialChef_Theme_MetaBoxes extends SocialChef_BaseSingleton {

	private $recipe_custom_meta_fields;
	private $recipe_list_custom_meta_fields;
	private $recipe_list_meta_box;

	private $page_sidebars_custom_meta_fields;
	private $page_sidebars_meta_box;
	
	protected function __construct() {
        parent::__construct();
    }

    public function init() {
	
        add_action( 'after_setup_theme', array($this, 'setup_meta_boxes' ) );
	}
	
	public function setup_meta_boxes() {
	
		$page_sidebars = array();	
		$page_sidebars[] = array('value' => '', 'label' => __('No sidebar', 'bookyourtravel'));
		$page_sidebars[] = array('value' => 'left', 'label' => __('Left sidebar', 'bookyourtravel'));
		$page_sidebars[] = array('value' => 'right', 'label' => __('Right sidebar', 'bookyourtravel'));
		$page_sidebars[] = array('value' => 'both', 'label' => __('Left and right sidebars', 'bookyourtravel'));
		
		$this->page_sidebars_custom_meta_fields = array(
			array( // Taxonomy Select box
				'label'	=> __('Select sidebar positioning', 'bookyourtravel'), // <label>
				// the description is created in the callback function with a link to Manage the taxonomy terms
				'id'	=> 'page_sidebar_positioning', // field id and name, needs to be the exact name of the taxonomy
				'type'	=> 'select', // type of field
				'options' => $page_sidebars
			)
		);
	
		$sort_by_columns = array();
		$sort_by_columns[] = array('value' => 'title', 'label' => __('Story title', 'socialchef'));
		$sort_by_columns[] = array('value' => 'ID', 'label' => __('Story ID', 'socialchef'));
		$sort_by_columns[] = array('value' => 'date', 'label' => __('Publish date', 'socialchef'));
		$sort_by_columns[] = array('value' => 'rand', 'label' => __('Random', 'socialchef'));
		$sort_by_columns[] = array('value' => 'comment_count', 'label' => __('Comment count', 'socialchef'));
	
		$this->recipe_list_custom_meta_fields = array(
			array( // Taxonomy Select box
				'label'	=> __('Meal course', 'socialchef'), // <label>
				// the description is created in the callback function with a link to Manage the taxonomy terms
				'id'	=> 'recipe_meal_course', // field id and name, needs to be the exact name of the taxonomy
				'type'	=> 'tax_select' // type of field
			),
			array( // Taxonomy Select box
				'label'	=> __('Difficulty', 'socialchef'), // <label>
				// the description is created in the callback function with a link to Manage the taxonomy terms
				'id'	=> 'recipe_difficulty', // field id and name, needs to be the exact name of the taxonomy
				'type'	=> 'tax_select' // type of field
			),
			array( // Select box
				'label'	=> __('Sort by field', 'socialchef'), // <label>
				// the description is created in the callback function with a link to Manage the taxonomy terms
				'id'	=> 'recipe_list_sort_by', // field id and name, needs to be the exact name of the taxonomy
				'type'	=> 'select', // type of field
				'options' => $sort_by_columns
			),
			array( // Post ID select box
				'label'	=> __('Sort descending?', 'socialchef'), // <label>
				'desc'	=> __('If checked, will sort stories in descending order', 'socialchef'), // description
				'id'	=> 'recipe_list_sort_descending', // field id and name
				'type'	=> 'checkbox', // type of field
			),
			array( // Post ID select box
				'label'	=> __('Show only featured stories?', 'socialchef'), // <label>
				'desc'	=> __('If checked, will show only stories marked as featured', 'socialchef'), // description
				'id'	=> 'recipe_list_show_featured', // field id and name
				'type'	=> 'checkbox', // type of field
			)
		);
	
		$this->recipe_custom_meta_fields = array(
			array( // Post ID select box
				'label'	=> __('Is Featured', 'socialchef'), // <label>
				'desc'	=> __('Show in lists where only featured items are shown.', 'socialchef'), // description
				'id'	=> 'recipe_is_featured', // field id and name
				'type'	=> 'checkbox', // type of field
			),
			array( // Taxonomy Select box
				'label'	=> __('Story language', 'socialchef'), // <label>
				// the description is created in the callback function with a link to Manage the taxonomy terms
				'id'	=> 'recipe_difficulty', // field id and name, needs to be the exact name of the taxonomy
				'type'	=> 'tax_select' // type of field
			),
			array( // Taxonomy Select box
				'label'	=> __('Story license', 'socialchef'), // <label>
				// the description is created in the callback function with a link to Manage the taxonomy terms
				'id'	=> 'recipe_meal_course', // field id and name, needs to be the exact name of the taxonomy
				'type'	=> 'tax_select' // type of field
			),
			// array( // Post ID select box
			// 	'label'	=> __('Preparation time (in minutes)', 'socialchef'), // <label>
			// 	'desc'	=> '', // description
			// 	'id'	=> 'recipe_preparation_time', // field id and name
			// 	'type'	=> 'slider',
			// 	'min'	=> '1',
			// 	'max'	=> '360',
			// 	'step'	=> '1'
			// ),
			// array( // Post ID select box
			// 	'label'	=> __('Cooking time (in minutes)', 'socialchef'), // <label>
			// 	'desc'	=> '', // description
			// 	'id'	=> 'recipe_cooking_time', // field id and name
			// 	'type'	=> 'slider',
			// 	'min'	=> '1',
			// 	'max'	=> '360',
			// 	'step'	=> '1'
			// ),
			array( // Post ID select box
				'label'	=> __('Reading level', 'socialchef'), // <label>
				'desc'	=> '', // description
				'id'	=> 'recipe_serving', // field id and name
				'type'	=> 'slider',
				'min'	=> '1',
				'max'	=> '10',
				'step'	=> '1'
			),
			array( // Repeatable & Sortable Text inputs
				'label'	=> __('Instructions', 'socialchef'), // <label>
				'desc'	=> __('Instructions for creating this story (step by step)', 'socialchef'), // description
				'id'	=> 'recipe_instructions', // field id and name
				'type'	=> 'repeatable', // type of field
				'sanitizer' => array( // array of sanitizers with matching kets to next array
					'featured' => 'meta_box_sanitize_boolean',
					'title' => 'sanitize_text_field',
					'desc' => 'wp_kses_data'
				),
				'repeatable_fields' => array ( // array of fields to be repeated
					array( // Instruction ID field
						'label'	=> __('Instruction', 'socialchef'), // <label>
						'id'	=> 'instruction', // field id and name
						'type'	=> 'textarea' // type of field
					)
					//,
					// array( // Image ID field
						// 'label'	=> __('Image', 'socialchef'), // <label>
						// 'id'	=> 'image', // field id and name
						// 'type'	=> 'image' // type of field
					// )
				)
			),
			array( // Repeatable & Sortable Text inputs
				'label'	=> __('Ingredients', 'socialchef'), // <label>
				'desc'	=> __('Ingredients for creating this story', 'socialchef'), // description
				'id'	=> 'recipe_ingredients', // field id and name
				'type'	=> 'repeatable', // type of field
				'sanitizer' => array( // array of sanitizers with matching kets to next array
					'featured' => 'meta_box_sanitize_boolean',
					'title' => 'sanitize_text_field',
					'desc' => 'wp_kses_data'
				),
				'repeatable_fields' => array ( // array of fields to be repeated
					array( // Instruction ID field
						'label'	=> __('Amount', 'socialchef'), // <label>
						'id'	=> 'amount', // field id and name
						'type'	=> 'text' // type of field
					),
					array( // Taxonomy Select box
						'label'	=> __('Ingredient', 'socialchef'), // <label>
						// the description is created in the callback function with a link to Manage the taxonomy terms
						'id'	=> 'ingredient', // field id and name, needs to be the exact name of the taxonomy
						'type'	=> 'tax_select' // type of field
					),
					array( // Taxonomy Select box
						'label'	=> __('Ingredient unit', 'socialchef'), // <label>
						// the description is created in the callback function with a link to Manage the taxonomy terms
						'id'	=> 'ingredient_unit', // field id and name, needs to be the exact name of the taxonomy
						'type'	=> 'tax_select' // type of field
					),
				)
			)
			
		);
		
		global $sc_theme_globals;
		if ($sc_theme_globals->enable_nutritional_elements()) {
		
			$this->recipe_custom_meta_fields[] = array( // Repeatable & Sortable Text inputs
				'label'	=> __('Nutritional values', 'socialchef'), // <label>
				'desc'	=> __('Nutritional values for creating this story', 'socialchef'), // description
				'id'	=> 'recipe_nutritional_values', // field id and name
				'type'	=> 'repeatable', // type of field
				'sanitizer' => array( // array of sanitizers with matching kets to next array
					'featured' => 'meta_box_sanitize_boolean',
					'title' => 'sanitize_text_field',
					'desc' => 'wp_kses_data'
				),
				'repeatable_fields' => array ( // array of fields to be repeated
					array( // Instruction ID field
						'label'	=> __('Amount', 'socialchef'), // <label>
						'id'	=> 'amount', // field id and name
						'type'	=> 'text' // type of field
					),
					array( // Taxonomy Select box
						'label'	=> __('Nutritional element', 'socialchef'), // <label>
						// the description is created in the callback function with a link to Manage the taxonomy terms
						'id'	=> 'nutritional_element', // field id and name, needs to be the exact name of the taxonomy
						'type'	=> 'tax_select' // type of field
					),
					array( // Taxonomy Select box
						'label'	=> __('Nutritional unit', 'socialchef'), // <label>
						// the description is created in the callback function with a link to Manage the taxonomy terms
						'id'	=> 'nutritional_unit', // field id and name, needs to be the exact name of the taxonomy
						'type'	=> 'tax_select' // type of field
					),
				)
			);
		
		}
		
		add_action( 'admin_init', array($this, 'recipe_admin_init' ) );
		add_action( 'admin_init', array($this, 'recipe_list_init' ) );
		add_action( 'admin_init', array($this, 'pages_meta_box_admin_init' ) );			
	}

	function recipe_admin_init() {
		
		new custom_add_meta_box( 'recipe_custom_meta_fields', __('Extra information', 'socialchef'), $this->recipe_custom_meta_fields, 'recipe', true );

	}
	
	
	function recipe_list_init() {

		$this->recipe_list_meta_box = new custom_add_meta_box( 'recipe_list_custom_meta_fields', __('Extra information', 'socialchef'), $this->recipe_list_custom_meta_fields, 'page' );	
		remove_action( 'add_meta_boxes', array( $this->recipe_list_meta_box, 'add_box' ) );
		add_action('add_meta_boxes', array($this, 'recipe_list_add_metaboxes_boxes' ) );
	}
		
	function recipe_list_add_metaboxes_boxes() {
		global $post;
		$template_file = get_post_meta($post->ID,'_wp_page_template',true);
		if ($template_file == 'page-recipe-list.php') {
			add_meta_box( $this->recipe_list_meta_box->id, $this->recipe_list_meta_box->title, array( $this->recipe_list_meta_box, 'meta_box_callback' ), 'page', 'normal', 'high' );
		}
	}
	
	function pages_meta_box_admin_init() {
		$this->page_sidebars_meta_box = new custom_add_meta_box( 'page_sidebars_custom_meta_fields', __('Sidebar selection', 'bookyourtravel'), $this->page_sidebars_custom_meta_fields, 'page' );		
		remove_action( 'add_meta_boxes', array( $this->page_sidebars_meta_box, 'add_box' ) );
		add_action('add_meta_boxes', array( $this, 'page_sidebar_add_meta_boxes' ) );		
	}
		
	function page_sidebar_add_meta_boxes() {
		global $post;
		$template_file = get_post_meta($post->ID,'_wp_page_template',true);
		if ($template_file != 'page-contact.php' && 
			$template_file != 'page-contact-form-7.php' && 
			!SocialChef_Theme_Utils::is_a_woocommerce_page()) {
			add_meta_box( $this->page_sidebars_meta_box->id, $this->page_sidebars_meta_box->title, array( $this->page_sidebars_meta_box, 'meta_box_callback' ), 'page', 'normal', 'high' );
		}
	}
}

// store the instance in a variable to be retrieved later and call init
$sc_theme_meta_boxes = SocialChef_Theme_MetaBoxes::get_instance();
$sc_theme_meta_boxes->init();