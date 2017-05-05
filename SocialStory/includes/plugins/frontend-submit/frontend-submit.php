<?php
/*
Class Name: Frontend Submit based on Frontend Uploader plugin
Description: Allow your visitors to upload content and moderate it.
Author: Rinat Khaziev, Daniel Bachhuber, ThemeEnergy.com
Version of Frontend Uploader: 0.8.1
Author of original plugin class URI: http://digitallyconscious.com
Author of modification: http://www.themeenergy.com
GNU General Public License, Free Software Foundation <http://creativecommons.org/licenses/GPL/2.0/>
This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
*/
define( 'FES_ROOT' , dirname( __FILE__ ) );
define( 'FES_FILE_PATH' , FES_ROOT . '/' . basename( __FILE__ ) );
define( 'FES_URL' , plugins_url( '/', __FILE__ ) );
define( 'FES_NONCE', 'frontendsubmit-form' );
require_once FES_ROOT . '/class-html-helper.php';
class Frontend_Submit {
	protected $allowed_mime_types;
	protected $_html_helper;
	protected $form_fields;
	private $entry = null;
	private $entry_id = 0;
	private $content_type = '';
	private $sc_theme_globals;
	
	function __construct() {
	
		global $sc_theme_globals;
		
		$this->sc_theme_globals = $sc_theme_globals;
		add_action( 'init', array( $this, 'action_init' ) );
	
		$this->allowed_mime_types = function_exists( 'wp_get_mime_types' ) ? wp_get_mime_types() : get_allowed_mime_types();
				$this->_html_helper = new Html_Helper();
	}
	
	function get_current_user_id() {
		global $current_user;
		if (!isset($current_user)) {
			$current_user = wp_get_current_user();
		}
				return $current_user->ID;
	}
	
	public function prepare_form($content_type) {
		$this->entry = null;
		$this->content_type = $content_type;
		
		$this->entry_id = 0;
		if (isset($_GET['fesid'])) {
			$this->entry_id = intval(wp_kses($_GET['fesid'],''));
			if ( $this->content_type == 'recipe' ) {
				$this->entry = get_post($this->entry_id);
				if ( $this->entry->post_author != $this->get_current_user_id() ) {
					$this->entry_id = 0;
					$this->entry = null;
				}
			}
		}
	
	}
	
	function action_init() {
	
		add_action( 'wp_ajax_frontend_recipe_submit', array( $this, 'upload_content' ) );
		add_action( 'wp_ajax_nopriv_frontend_recipe_submit', array( $this, 'upload_content' ) );
	}
		
	/**
	* Determine if we should auto approve the submission or not
	*
	* @return boolean [description]
	*/
	function _is_public() {
		return $this->sc_theme_globals->publish_frontend_submissions_immediately();
	}
	
	function _is_demo() {
		return defined('SC_DEMO');
	}
	
	function _upload_chimple_update($post_id, $set_as_featured) {
		
		//upload canvas base64 data
		// baseFromJavascript will be the javascript base64 string retrieved of some way (async or post submited)
		$baseFromJavascript = $_POST['gameCanvasImage']; //your data in base64 'data:image/png....';
		if($baseFromJavascript != null && $baseFromJavascript != '') {
			// We need to remove the "data:image/png;base64,"
			$base_to_php = explode(',', $baseFromJavascript);
			// the 2nd item in the base_to_php array contains the content of the image
			$decoded = base64_decode($base_to_php[1]);
					
			$upload_dir   =  wp_upload_dir();
			$upload_path      = str_replace( '/', DIRECTORY_SEPARATOR, $upload_dir['path'] ) . DIRECTORY_SEPARATOR;
			$filename         = 'newImage.png';
			$hashed_filename  = md5( $filename . microtime() ) . '_' . $filename;
			$image_upload     = file_put_contents( $upload_path . $hashed_filename, $decoded );
			
			// @new
			$file             = array();
			$file['error']    = '';
			$file['tmp_name'] = $upload_path . $hashed_filename;
			
			$file['name']     = $hashed_filename;
			
			$file['type']     = 'image/jpg';
			$file['size']     = filesize( $upload_path . $hashed_filename );
			
			// Trying to upload the file
			$filename = pathinfo( $file['name'], PATHINFO_FILENAME );
			$post_overrides = array(
						'post_status' => $this->_is_public() ? 'publish' : 'private',
						'post_title' => isset( $_POST['post_title'] ) && ! empty( $_POST['post_title'] ) ? sanitize_text_field( $_POST['post_title'] ) : sanitize_text_field( $filename ),
						'post_content' => empty( $caption ) ? __( 'Unnamed', 'socialchef' ) : $caption,
						'post_excerpt' => empty( $caption ) ? __( 'Unnamed', 'socialchef' ) :  $caption,
						);
			$upload_id = media_handle_sideload( $file, (int) $post_id, $post_overrides['post_title'], $post_overrides );
			if ( !is_wp_error( $upload_id ) ) {
				if ($set_as_featured) {
					set_post_thumbnail($post_id, $upload_id);
				}
				$media_ids[] = $upload_id;
			} else {
				$errors['fes-error-media'][] = $file['name'];
			}
		}
				
		/**
		* $success determines the rest of upload flow
		* Setting this to true if no errors were produced even if there's was no files to upload
		*/
		$success = empty( $errors ) ? true : false;
		// Allow additional setup
		// Pass array of attachment ids
		do_action( 'fes_after_upload', $media_ids, $success, $post_id );
		
		//Save chimpleStoryJSON
		$encodedChimpleStoryJSONStr = $_POST['chimpleStoryJSON'];

		$encodedChimpleStoryJSONStrToPhp = explode(',', $encodedChimpleStoryJSONStr);
		// the 2nd item in the base_to_php array contains the content of the image
		$decodedChimpleStoryJSONStr = base64_decode($encodedChimpleStoryJSONStrToPhp[1]);
				
		$upload_dir   =  wp_upload_dir();
		$upload_path      = str_replace( '/', DIRECTORY_SEPARATOR, $upload_dir['path'] ) . DIRECTORY_SEPARATOR;
		$filename         = $post_id . '.json';		
		$image_upload     = file_put_contents( $upload_path . $filename, $decodedChimpleStoryJSONStr );
		
		return array( 'success' => $success, 'media_ids' => $media_ids, 'errors' => $errors );			
	}
	
	/**
	* Handle uploading of the files
	*
	* @param int     $post_id Parent post id
	* @return array Combined result of media ids and errors if any
	*/
	function _upload_files( $post_id, $input_name, $set_as_featured ) {
		
		$media_ids = $errors = array();
		// Bail if there are no files
		if ( empty( $_FILES ) || !isset($_FILES[$input_name]) )
			return false;
		// File field name could be user defined, so we just get the first file
		$files = $_FILES[$input_name];
		for ( $i = 0; $i < count( $files['name'] ); $i++ ) {
			$fields = array( 'name', 'type', 'tmp_name', 'error', 'size' );
			foreach ( $fields as $field ) {
				$k[$field] = $files[$field][$i];
			}
			$k['name'] = sanitize_file_name( $k['name'] );
			// Skip to the next file if upload went wrong
			if ( $k['tmp_name'] == "" ) {
				continue;
			}
			$typecheck = wp_check_filetype_and_ext( $k['tmp_name'], $k['name'], false );
			// Add an error message if MIME-type is not allowed
			if ( ! in_array( $typecheck['type'], (array) $this->allowed_mime_types ) ) {
				$errors['fes-disallowed-mime-type'][] = array( 'name' => $k['name'], 'mime' => $k['type'] );
				continue;
			}
			// Setup some default values
			// However, you can make additional changes on 'fes_after_upload' action
			$caption = '';
			// Try to set post caption if the field is set on request
			// Fallback to post_content if the field is not set
			if ( isset( $_POST['caption'] ) )
				$caption = sanitize_text_field( $_POST['caption'] );
			elseif ( isset( $_POST['post_content'] ) )
				$caption = sanitize_text_field( $_POST['post_content'] );
			$filename = pathinfo( $k['name'], PATHINFO_FILENAME );
			$post_overrides = array(
				'post_status' => $this->_is_public() ? 'publish' : 'private',
				'post_title' => isset( $_POST['post_title'] ) && ! empty( $_POST['post_title'] ) ? sanitize_text_field( $_POST['post_title'] ) : sanitize_text_field( $filename ),
				'post_content' => empty( $caption ) ? __( 'Unnamed', 'socialchef' ) : $caption,
				'post_excerpt' => empty( $caption ) ? __( 'Unnamed', 'socialchef' ) :  $caption,
			);
			// Trying to upload the file
			$upload_id = media_handle_sideload( $k, (int) $post_id, $post_overrides['post_title'], $post_overrides );
			if ( !is_wp_error( $upload_id ) ) {
				if ($set_as_featured) {
					set_post_thumbnail($post_id, $upload_id);
				}
				$media_ids[] = $upload_id;
			} else
				$errors['fes-error-media'][] = $k['name'];
		}
		/**
		* $success determines the rest of upload flow
		* Setting this to true if no errors were produced even if there's was no files to upload
		*/
		$success = empty( $errors ) ? true : false;
		// Allow additional setup
		// Pass array of attachment ids
		do_action( 'fes_after_upload', $media_ids, $success, $post_id );
		return array( 'success' => $success, 'media_ids' => $media_ids, 'errors' => $errors );
	}
	
	private function _save_recipe_specific_fields($post_id = 0, $existing = false ) {
	
		global $sc_recipes_post_type, $wpdb;
		
	// 	$ingredient_indexes = array();
	// 	$instruction_indexes = array();
	// 	$nutritional_element_indexes = array();
		
	// 	foreach ($_POST as $key => $value) {
	// 		if (preg_match("/ingredient_(\d+)_name/", $key, $match)) {
	// 			$ingredient_indexes[] = $match[1];
	// 		}
	// 	}
	// 	foreach ($_POST as $key => $value) {
	// 		if (preg_match("/instruction_(\d+)/", $key, $match)) {
	// 			$instruction_indexes[] = $match[1];
	// 		}
	// 	}
	// 	if ($this->sc_theme_globals->enable_nutritional_elements()) {
	// 		foreach ($_POST as $key => $value) {
	// 			if (preg_match("/nutritional_element_(\d+)_name/", $key, $match)) {
	// 				$nutritional_element_indexes[] = $match[1];
	// 			}
	// 		}
	// 	}
		
	// 	$sc_recipes_post_type->clear_recipe_ingredients($post_id);
	// 	$ingredient_array = array();
	// 	$count = 0;
	// 	foreach ($ingredient_indexes as $ingredient_index) {
			
	// 		$amount = isset($_POST["ingredient_{$ingredient_index}_quantity"]) ? $_POST["ingredient_{$ingredient_index}_quantity"] : '0';
	// 		$amount = floatval(str_replace(',', '.', $amount));
	// 		$ingredient_name = isset($_POST["ingredient_{$ingredient_index}_name"]) ? wp_kses($_POST["ingredient_{$ingredient_index}_name"], '') : '';
	// 		$ingredient_unit_term_id = isset($_POST["ingredient_{$ingredient_index}_unit"]) ? intval($_POST["ingredient_{$ingredient_index}_unit"]) : 0;
	// 		if (!empty($ingredient_name) && $amount > 0 && $ingredient_unit_term_id > 0) {
			
	// 			$ingredient_term = get_term_by( 'name', $ingredient_name, 'ingredient' );
	// 			$ingredient_term_id = 0;
	// 			if ($ingredient_term) {
	// 				$ingredient_term_id = (int)$ingredient_term->term_id;
	// 			} else {
	// 				$ingredient_term = wp_insert_term($ingredient_name, 'ingredient');
	// 				if ( !is_wp_error($ingredient_term) ) {
	// 					$ingredient_term_id = $ingredient_term['term_id'];
	// 				}
	// 			}
	// 			if ($ingredient_term_id > 0) {
	// 				$sc_recipes_post_type->save_recipe_ingredient($post_id, $ingredient_term_id, $ingredient_unit_term_id, $amount);
					
	// 				$ingredient = get_term_by( 'ID', $ingredient_term_id, 'ingredient' );
	// 				$ingredient_unit = get_term_by( 'ID', $ingredient_unit_term_id, 'ingredient_unit' );
					
	// 				$ingredient_array[$count] = array(
	// 					'amount' => $amount,
	// 					'ingredient' => $ingredient->slug,
	// 					'ingredient_unit' => $ingredient_unit->slug
	// 				);					
	// 			}
	// 		}
			
	// 		$count++;
	// 	}
		
	// 	if ($existing)
	// 		update_post_meta( $post_id, 'recipe_ingredients', $ingredient_array );
	// 	else
	// 		add_post_meta( $post_id, 'recipe_ingredients', $ingredient_array, true );
				
	// 	if ($this->sc_theme_globals->enable_nutritional_elements()) {
	// 		$sc_recipes_post_type->clear_recipe_nutritional_elements($post_id);
	// 		$nutritional_element_array = array();
	// 		$count = 0;
	// 		foreach ($nutritional_element_indexes as $nutritional_element_index) {
				
	// 			$amount = isset($_POST["nutritional_element_{$nutritional_element_index}_quantity"]) ? $_POST["nutritional_element_{$nutritional_element_index}_quantity"] : '0';
	// 			$amount = floatval(str_replace(',', '.', $amount));
				
	// 			$nutritional_element_name = isset($_POST["nutritional_element_{$nutritional_element_index}_name"]) ? wp_kses($_POST["nutritional_element_{$nutritional_element_index}_name"], '') : '';
	// 			$nutritional_unit_term_id = isset($_POST["nutritional_{$nutritional_element_index}_unit"]) ? intval($_POST["nutritional_{$nutritional_element_index}_unit"]) : 0;
	// 			if (!empty($nutritional_element_name) && $amount > 0 && $nutritional_unit_term_id > 0) {
				
	// 				$nutritional_element_term = get_term_by( 'name', $nutritional_element_name, 'nutritional_element' );
	// 				$nutritional_element_term_id = 0;
	// 				if ($nutritional_element_term) {
	// 					$nutritional_element_term_id = (int)$nutritional_element_term->term_id;
	// 				} else {
	// 					$nutritional_element_term = wp_insert_term($nutritional_element_name, 'nutritional_element');
	// 					if ( !is_wp_error($nutritional_element_term) ) {
	// 						$nutritional_element_term_id = $nutritional_element_term['term_id'];
	// 					}
	// 				}
	// 				if ($nutritional_element_term_id > 0) {
	// 					$sc_recipes_post_type->save_recipe_nutritional_element($post_id, $nutritional_element_term_id, $nutritional_unit_term_id, $amount);
						
	// 					$nutritional_element = get_term_by( 'ID', $nutritional_element_term_id, 'nutritional_element' );
	// 					$nutritional_unit = get_term_by( 'ID', $nutritional_unit_term_id, 'nutritional_unit' );
						
	// 					$nutritional_element_array[$count] = array(
	// 						'amount' => $amount,
	// 						'nutritional_element' => $nutritional_element->slug,
	// 						'nutritional_unit' => $nutritional_unit->slug
	// 					);
						
	// 				}
	// 			}
				
	// 			$count++;
	// 		}
			
	// 		if ($existing)
	// 			update_post_meta( $post_id, 'recipe_nutritional_values', $nutritional_element_array );
	// 		else
	// 			add_post_meta( $post_id, 'recipe_nutritional_values', $nutritional_element_array, true );
	// 	}
		
	// 	$instruction_array = array();
	// 	$count = 0;
	// 	foreach ($instruction_indexes as $instruction_index) {
			
	// 		$instruction = isset($_POST["instruction_{$instruction_index}"]) ? wp_kses($_POST["instruction_{$instruction_index}"], '') : '';
	// 		if (!empty($instruction)) {
	// 			$instruction_array[$count]['instruction'] = $instruction;
	// 		}
	// 		$count++;
	// 	}
		
	// 	if ($existing)
	// 		update_post_meta( $post_id, 'recipe_instructions', $instruction_array );
	// 	else
	// 		add_post_meta( $post_id, 'recipe_instructions', $instruction_array, true );
	}
	
	private function _save_extra_fields( $post_id = 0, $existing = false ) {
		// Post ID not set, bailing
		if ( ! $post_id = (int) $post_id )
			return false;
			
		// No meta fields in field mapping, bailing
		if ( !isset( $this->form_fields ) || empty( $this->form_fields ) )
			return false;
		foreach ( $this->form_fields as $extra_field ) {
			
			if ($extra_field->type != 'div') {
			
				$extra_field_name = $extra_field->name;
						
				if ( !isset( $_POST[$extra_field_name] ) )
					continue;
					
				$value = $_POST[$extra_field_name];
				
				// if ($extra_field_name == 'recipe_categories') {
				
				// 	$term_ids = array();
				// 	foreach ($value as $term_id) {
				// 		$term_ids[] = intval($term_id);
				// 	}
					
				// 	wp_set_post_terms( $post_id, $term_ids, 'recipe_category');
				
				// 	} else
				if ($extra_field_name == 'recipe_difficulty') {
				
					wp_set_post_terms( $post_id, array(intval($value)), 'recipe_difficulty');
					
					} elseif ($extra_field_name == 'recipe_meal_course') {
								wp_set_post_terms( $post_id, array(intval($value)), 'recipe_meal_course');
					
				} else {
					// Sanitize array
					if ( $extra_field->type == 'checkbox' && isset($extra_field->class) && $extra_field->class != 'checkboxes') {
						$value = intval($value);
					} elseif ( is_array( $value ) ) {
						$value = array_map( array( $this, '_sanitize_array_element_callback' ), $value );
						// Sanitize everything else
					} else {
						$value = sanitize_text_field( $value );
					}
					
					if ( !$existing )
						add_post_meta( $post_id, $extra_field_name, $value, true );
					else
						update_post_meta( $post_id, $extra_field_name, $value );
				}
			}
		}
	}
	
	function _sanitize_array_element_callback( $el ) {
		return sanitize_text_field( $el );
	}
	
	/**
	* Handle post uploads
	*/
	function _upload_entry() {
	
		$errors = array();
		$success = true;
		
		$content_type = '';
		if (isset( $_POST['content_type'] ) )
			$content_type = $_POST['content_type'];
			$recipe_status = isset($_POST['recipe_status']) ? $_POST['recipe_status'] : 'private';
			
		if ( $content_type == 'recipe' ) {
			$post_type = $content_type;
			
			$entry_id = 0;
			$existing_post = null;
			
			if ( isset($_POST['entry_id']) ) {
			
				$entry_id = intval(wp_kses($_POST['entry_id'], ''));
				$existing_post = get_post($entry_id);
				
				if (!$existing_post) {
					$entry_id = 0;
				} else {
					if ( (int)$existing_post->post_author != (int)$this->get_current_user_id() ) {
						$entry_id = 0;
					} else {
						// we can safely strip slashes because wp_insert_post and wp_update_post does it's own addslashes
						$existing_post->post_title = (isset($_POST['post_title']) ? stripslashes($_POST['post_title']) : '');
						$existing_post->post_content = isset($_POST['post_content']) ? stripslashes($_POST['post_content']) : '';
						// $existing_post->post_status = $this->_is_public() && $recipe_status == 'publish' ? 'publish' : 'private';
						$existing_post->post_status = 'publish';
						
						$entry_id = wp_update_post($existing_post, true);
					}
				}
			}
			if ( $entry_id == 0 ) {
				
				// Construct post array;
				// we can safely strip slashes because wp_insert_post and wp_update_post does it's own addslashes
				$post_array = array(
					'post_type' =>  $post_type,
					'post_title'    => stripslashes($_POST['post_title']),
					'post_content'  => stripslashes($_POST['post_content']),
					// 'post_status'   => $this->_is_public() && $recipe_status == 'publish' ? 'publish' : 'private',
					'post_status' => 'publish',
				);
				$author = isset( $_POST['post_author'] ) ? wp_kses_post( $_POST['post_author'] ) : '';
				$users = get_users( array(
					'search' => $author,
					'fields' => 'ID'
				) );
				if ( isset( $users[0] ) ) {
					$post_array['post_author'] = (int) $users[0];
				}
				$post_array = apply_filters( 'fes_before_create_post', $post_array );
					
				$entry_id = wp_insert_post( $post_array, true );
				
				// If the author name is not in registered users
				// Save the author name if it was filled and post was created successfully
				if ( $author )
					add_post_meta( $entry_id, 'author_name', $author );
				if ($post_type == 'recipe') {
										$admin_email = get_option( 'admin_email' );
					$subject = sprintf(__( 'New Story Submission', 'socialchef' ), get_bloginfo( 'name' ));
					
					$body = sprintf(__( 'A new story has been submitted on your website: %s', 'socialchef' ), get_bloginfo( 'url' ));
					$body .= "\r\n";
					$body .= sprintf(__( "To view the newly submitted story please follow the link bellow:\n%s", 'socialchef' ), get_permalink($entry_id));
					$headers   = array();
					$headers[] = "MIME-Version: 1.0";
					$headers[] = "Content-type: text/plain; charset=utf-8";
					$headers[] = "From: " . get_bloginfo( 'name' ) . " <" . $admin_email . ">";
					$headers[] = "Reply-To: " . get_bloginfo( 'name' ) . " <" . $admin_email . ">";
					$headers[] = "X-Mailer: PHP/".phpversion();
					
					wp_mail( $admin_email, $subject, $body, implode( "\r\n", $headers ), '-f ' . $admin_email );
				}
			}
			
			// Something went wrong
			if ( is_wp_error( $entry_id ) ) {
				$errors[] = 'fes-error-post';
				$success = false;
			} else {
				do_action( 'fes_after_create_post', $entry_id );
				$existing = ($existing_post != null);
				$this->_save_extra_fields( $entry_id, $existing);
				$this->_save_recipe_specific_fields( $entry_id, $existing);
			}
		}
		
		return array( 'success' => $success, 'entry_id' => $entry_id, 'errors' => $errors, 'content_type' => $content_type );
	}
	/**
	* Handle post+media upload
	*/
	function upload_content() {
	
		$result = array();
		// Bail if something fishy is going on
		if ( !$this->_check_nonce() ) {
			wp_safe_redirect( esc_url_raw( add_query_arg( array( 'response' => 'fes-error', 'errors' =>  'nonce-failure' ), wp_get_referer() ) ) );
			exit;
		}
		$form_post_id = isset( $_POST['form_post_id'] ) ? (int) $_POST['form_post_id'] : 0;
		if ( $_POST['content_type'] == 'recipe' )
				$this->_initialize_recipe_fields();
			
		if (!$this->_is_demo()) {
		
			$result = $this->_upload_entry();
			
			if ( $_POST['content_type'] == 'recipe' ) {
				if ( ! is_wp_error( $result['entry_id'] ) ) {
					$media_result = $this->_upload_chimple_update( $result['entry_id'], true );
					//$media_result = $this->_upload_files( $result['entry_id'], 'featured_image', true );
					$result['media_ids'] = $media_result['media_ids'];
					$result['success'] = $media_result['success'];
					$result['errors'] = array_merge( $result['errors'], $media_result['errors'] );
				}
				}
			
		} else {
			$result = array( 'success' => true, 'entry_id' => 0, 'errors' => array(), 'content_type' => $_POST['content_type'] );
		}
		/**
		* Process result with filter
		*
		* @param array   $result assoc array holding $post_id, $media_ids, bool $success, array $errors
		*/
		do_action( 'fes_upload_result', $result );
		// Notify the admin via email
		$this->_notify_admin( $result );
		// Handle error and success messages, and redirect
		$this->_handle_result( $result );
		exit;
	}
	/**
	* Notify site administrator by email
	*/
	function _notify_admin( $result = array() ) {
		// Notify site admins of new upload
		if ( !$result['success'] )
			return;
		// TODO: It'd be nice to add the list of upload files
		//$to = !empty( $this->settings['notification_email'] ) && filter_var( $this->settings['notification_email'], FILTER_VALIDATE_EMAIL ) ? $this->settings['notification_email'] : get_option( 'admin_email' );
		//$subj = __( 'New content was uploaded on your site', 'socialchef' );
		//wp_mail( $to, $subj, $this->settings['admin_notification_text'] );
	}
	/**
	* Process response from upload logic
	*/
	function _handle_result( $result = array() ) {
		// Redirect to referrer if repsonse is malformed
		if ( empty( $result ) || !is_array( $result ) ) {
			wp_safe_redirect( wp_get_referer() );
			return;
		}
		$errors_formatted = array();
		// Either redirect to success page if it's set and valid
		// Or to referrer
		$url = wp_get_referer();
		// $query_args will hold everything that's needed for displaying notices to user
		$query_args = array();
		// Account for successful uploads
		if ( isset( $result['success'] ) && $result['success'] ) {
			// If it's a recipe
			if ( $result['content_type'] == 'recipe' ) {
				if ( isset( $_POST['fesid'] ) ) {
					$query_args['response'] = 'fes-recipe-updated';
				} elseif ( isset( $result['entry_id'] ) ) {
					$query_args['response'] = 'fes-recipe-sent';
				}
			} elseif ( isset( $result['media_ids'] ) && !isset( $result['entry_id'] ) ) {
				// If it's media uploads
				$query_args['response'] = 'fes-sent';
			}
		}
		// Some errors happened
		// Format a string to be passed as GET value
		if ( !empty( $result['errors'] ) ) {
			$query_args['response'] = 'fes-error';
			$_errors = array();
			
			// Iterate through key=>value pairs of errors
			foreach ( $result['errors'] as $key => $error ) {
				if ( isset( $error[0] ) )
					$_errors[$key] = join( ',,,', (array) $error[0] );
			}
			foreach ( $_errors as $key => $value ) {
				$errors_formatted[] = "{$key}:{$value}";
			}
			$query_args['errors'] = join( ';', $errors_formatted );
		}
		// Perform a safe redirect and exit
		wp_safe_redirect( esc_url_raw( add_query_arg( $query_args, $url ) ) );
		exit;
	}
	
	/**
	* Handles security checks
	*
	* @return bool
	*/
	function _check_nonce() {
		return wp_verify_nonce( $_REQUEST['fes_nonce'], FES_NONCE );
	}
	
	/**
	* Handle response notices
	*
	* @param array   $res [description]
	* @return [type]      [description]
	*/
	function _display_response_notices( $res = array() ) {
		if ( empty( $res ) )
			return;
		$output = '';
		$map = array(
			'fes-sent' => array(
				'text' => __( 'Your file was successfully uploaded!', 'socialchef' ),
				'class' => 'alert-success',
			),
			'fes-recipe-sent' => array(
				'text' => __( 'Your story was successfully submitted!', 'socialchef' ),
				'class' => 'alert-success',
			),
			'fes-recipe-updated' => array(
				'text' => __( 'Your story was successfully updated!', 'socialchef' ),
				'class' => 'alert-success',
			),
			'fes-error' => array(
				'text' => __( 'There was an error with your submission', 'socialchef' ),
				'class' => 'alert-danger',
			),
		);
		
		$edit_notices = array(
			'recipe' => array (
				'text' => __('You are currently editing your selected story. Click "Submit" to save your changes.', 'socialchef'),
				'class' => 'alert-warning'
			)
			);
		if ( isset( $res['response'] ) && isset( $map[ $res['response'] ] ) )
			$output .= $this->_notice_html( $map[ $res['response'] ]['text'] , $map[ $res['response'] ]['class'] );
		if ( !empty( $res['errors' ] ) )
			$output .= $this->_display_errors( $res['errors' ] );
			
		if ( !empty( $res['fesid'] ) && isset($this->entry_id) && isset($this->content_type) && $this->entry != null && (!isset( $res['response'] ) || $res['response'] != 'fes-recipe-updated' ) )
			$output .= $this->_notice_html( $edit_notices[ $this->content_type ]['text'] , $edit_notices[ $this->content_type ]['class'] );
			
		echo $output;
	}
	
	/**
	* Returns html chunk of single notice
	*
	* @param string  $message Text of the message
	* @param string  $class   Class of container
	* @return string          [description]
	*/
	function _notice_html( $message, $class ) {
		if ( empty( $message ) || empty( $class ) )
			return;
		return sprintf( '<div class="alert %1$s">%2$s</div>', $class, $message );
	}
	
	/**
	* Handle errors
	*
	* @param string  $errors [description]
	* @return string HTML
	*/
	function _display_errors( $errors ) {
		
		$errors_arr = explode( ';', $errors );
		$output = '';
		$map = array(
			'nonce-failure' => array(
				'text' => __( 'Security check failed!', 'socialchef' ),
			),
			'fes-disallowed-mime-type' => array(
				'text' => __( 'This kind of file is not allowed. Please, try selecting another file.', 'socialchef' ),
				'format' => '%1$s: <br/> File name: %2$s <br/> MIME-TYPE: %3$s',
			),
			'fes-invalid-post' => array(
				'text' =>__( 'The content you are trying to post is invalid.', 'socialchef' ),
			),
			'fes-error-media' => array(
				'text' =>__( "Couldn't upload the file", 'socialchef' ),
			),
			'fes-error-post' => array(
				'text' =>__( "Couldn't create the post", 'socialchef' ),
			),
			'fes-error-recipe-wrong-user' => array(
				'text' =>__( "User does not own story specified", 'socialchef' ),
			)
		);
		// TODO: DAMN SON you should refactor this
		foreach ( $errors_arr as $error ) {
			$error_type = explode( ':', $error );
			$error_details = explode( '|', $error_type[1] );
			$message = '';
			// Iterate over different errors
			foreach ( $error_details as $single_error ) {
				// And see if there's any additional details
				$details = isset( $single_error ) ? explode( ',,,', $single_error ) : explode( ',,,', $single_error );
				// Add a description to our details array
				if (isset( $error_type[0] ) && isset($map[ $error_type[0] ]) ) {
					array_unshift( $details, $map[ $error_type[0] ]['text']  );
					// If we have a format, let's format an error
					// If not, just display the message
					if ( isset( $map[ $error_type[0] ]['format'] ) )
						$message = vsprintf( $map[ $error_type[0] ]['format'], $details );
					else
						$message = $map[ $error_type[0] ]['text'];
				}
			}
			$output .= $this->_notice_html( $message, 'failure' );
		}
		return $output;
	}
	
	function _render_div( $atts ) {
		$atts = $this->_prepare_atts($atts);
	
		extract( $atts );
		$atts = array( 'class' => $class );
		if (!$is_closing)
			return $this->_html_helper->element_start( 'div', $atts );
		else
			return $this->_html_helper->element_end( 'div' );
	}
	
	function _render_input( $atts ) {
		$atts = $this->_prepare_atts($atts);
	
		extract( $atts );
		
		$atts = array( 'id' => $id, 'class' => $class, 'multiple' => $multiple );
		
		// Workaround for HTML5 multiple attribute
		if ( (bool) $multiple === false )
			unset( $atts['multiple'] );
		$selected_value = $this->get_entry_field_value($name);
		if ($this->entry != null && isset($selected_value) ) {
			if ($type == 'checkbox' && $selected_value == '1')
				$atts['checked'] = 'checked';
			else if ($type == 'text')
				$value = $selected_value;
		}
			
		// Allow multiple file upload by default.
		// To do so, we need to add array notation to name field: []
		if ( !strpos( $name, '[]' ) && $type == 'file' )
			$name = $name . '[]';
		if ($type == 'text') {
			$input = $this->_html_helper->input( $type, $name, $value, $atts, $description );
		} else
			$input = $this->_html_helper->input( $type, $name, $value, $atts );
		// No need for wrappers or labels for hidden input
		if ( $type == 'hidden' )
			return $input;
		if ($type == 'text' || $type=='submit') {
			return $input;
		} else {
			$label = $this->_html_helper->element( 'label', $description, array( 'for' => $id ), false );
			return $label . $input;
		}
	}
	
	/**
	* Textarea element callback
	*
	* @param array   shortcode attributes
	* @return string formatted html element
	*/
	function _render_textarea( $atts ) {
	
		$atts = $this->_prepare_atts($atts);
	
		extract( $atts );
		
		$selected_value = $this->get_entry_field_value($name);
		if ( $this->entry != null && isset($selected_value) ) {
			$value = $selected_value;
		}
		
		// Render WYSIWYG textarea
		if ( $wysiwyg_enabled ) {
			ob_start();
			wp_editor( $value, $id, array(
					'textarea_name' => $name,
					'media_buttons' => false,
					'teeny' => true,
					'quicktags' => false
				) );
			$tiny = ob_get_clean();
			return $tiny;
		}
		// Render plain textarea
		$element = $this->_html_helper->element( 'textarea', $value, array( 'name' => $name, 'id' => $id, 'class' => $class ) );
		return $element;
	}
	function get_entry_field_value($field_id) {
		
		if ($this->entry != null) {
		
			if ( $this->content_type == 'recipe' ) {
				
				$recipe_obj = new sc_recipe(intval($this->entry_id));
				return $recipe_obj->get_field_value($field_id, false);
				
					}
		}
		
		return null;
	}
	
	/**
	* Select element callback
	*
	* @param array   shortcode attributes
	* @return [type]       [description]
	*/
	function _render_select( $atts ) {
	
		$atts = $this->_prepare_atts($atts);
	
		extract( $atts );
		$atts = array( 'values' => $values );
		$values = explode( ',', $values );
		$options = '';
		
		$selected_value = null;
		if (isset($value))
			$selected_value = $value;
			
		//Build options for the list
		foreach ( $values as $option ) {
			$kv = explode( ":", $option );
			$caption = isset( $kv[1] ) ? $kv[1] : $kv[0];
			$option_atts = array( 'value' => $kv[0] );
			if ( isset($selected_value) && $selected_value == $kv[0] )
				$option_atts['selected'] = 'selected';
			
			$options .= $this->_html_helper->element( 'option', $caption, $option_atts, false );
		}
		//Render select field
		$element = $this->_html_helper->element( 'select', $options, array(
					'name' => $name,
					'id' => $id,
					'class' => $class
				), false );
		return $element;
	}
	/**
	* Checkboxes element callback
	*
	* @param array   shortcode attributes
	* @return [type]       [description]
	*/
	function _render_checkboxes( $atts ) {
	
		$atts = $this->_prepare_atts($atts);
		extract( $atts );
		
		$atts = array( 'values' => $values );
		$values = explode( ',', $values );
		$options = '';
		$selected_values = $this->get_entry_field_value($name);
		
		// Making sure we're having array of values for checkboxes
		if ( false === stristr( '[]', $name ) )
			$name = $name . '[]';
		//Build options for the list
		foreach ( $values as $option ) {
			$kv = explode( ":", $option );
			if (is_array($selected_values) && in_array($kv[0], $selected_values)) {
				$atts['checked'] = 'checked';
			} else {
				unset($atts['checked']);
			}
			$options .= $this->_html_helper->_checkbox( $name, isset( $kv[1] ) ? $kv[1] : $kv[0], $kv[0], $atts, array() );
		}
		$description = $label = $this->_html_helper->element( 'label', $description, array(), false );
		// Render select field
		$element = $this->_html_helper->element( 'div', $description . $options, array( 'class' => 'checkbox-wrapper' ), false );
		
		$container_class = 'fes-input-wrapper';
		if (isset($container_class_override) && !empty($container_class_override))
			$container_class .= ' ' . $container_class_override;
		return $this->_html_helper->element( 'div', $element, array( 'class' => $container_class ), false );
	}
	
	function _prepare_atts($atts) {
		$supported_atts = array(
			'id' => '',
			'name' => '',
			'description' => '',
			'value' => '',
			'type' => '',
			'class' => '',
			'multiple' => false,
			'values' => '',
			'wysiwyg_enabled' => false,
			'role' => 'meta',
			'container_class_override' => '',
			'is_closing' => false,
		);
		return shortcode_atts($supported_atts, $atts);
	}
	
		function _initialize_recipe_fields() {
	
		$this->form_fields = array();
		// row
		$this->form_fields[] = (object)array( 'type' => 'div', 'class' => 'f-row', 'is_closing' => false );
		// $prep_time_str = ":" . __('Select preparation time (minutes)', 'socialchef') . "";
		// for ($i = 1;$i < 181;$i++) {
		// 	$prep_time_str .= ",$i:$i";
		// }
		// $cook_time_str = ":" . __('Select cook time (minutes)', 'socialchef') . "";
		// for ($i = 1;$i < 181;$i++) {
		// 	$cook_time_str .= ",$i:$i";
		// }
		
		// prep time
		// $this->form_fields[] = (object)array( 'type' => 'div', 'class' => 'third', 'is_closing' => false );
		// $preparation_time_field = array( 'type' => 'select', 'role' => 'internal', 'name' => 'recipe_preparation_time', 'id' => 'fes_recipe_preparation_time', 'description' => __( 'Preparation time', 'socialchef' ), 'values' => $prep_time_str, 'class' => 'select' );
		// if ($this->entry != null) {
		// 	$preparation_time_field['value'] = $this->get_entry_field_value('recipe_preparation_time');
		// }
		// $this->form_fields[] = (object)$preparation_time_field;
		
			
		// $this->form_fields[] = (object)array( 'type' => 'div', 'class' => '', 'is_closing' => true );
		// // cook time
		// 		$this->form_fields[] = (object)array( 'type' => 'div', 'class' => 'third', 'is_closing' => false );
		// $cooking_time_field = array( 'type' => 'select', 'role' => 'internal', 'name' => 'recipe_cooking_time', 'id' => 'fes_recipe_cooking_time', 'description' => __( 'Cooking time', 'socialchef' ), 'values' => $cook_time_str, 'class' => 'select' );
		// if ($this->entry != null) {
		// 	$cooking_time_field['value'] = $this->get_entry_field_value('recipe_cooking_time');
		// }
		// $this->form_fields[] = (object)$cooking_time_field;
		// 		$this->form_fields[] = (object)array( 'type' => 'div', 'class' => '', 'is_closing' => true );
		// serving
				$this->form_fields[] = (object)array( 'type' => 'div', 'class' => 'third', 'is_closing' => false );
		$serving_str = ":" . __('Select reading level', 'socialchef') . ",1:" . __('First alphabets', 'socialchef') . ",2:" . __('First words', 'socialchef') . ",3:" . __('First sentences', 'socialchef') . ",4:" . __('First paragraphs', 'socialchef') . ",5:" . __('Well versed reader', 'socialchef');
		$serving_field = array( 'type' => 'select', 'role' => 'internal', 'name' => 'recipe_serving', 'id' => 'fes_recipe_serving', 'description' => __( 'Reading Level', 'socialchef' ), 'values' => $serving_str, 'class' => 'select' );
		if ($this->entry != null) {
			$serving_field['value'] = $this->get_entry_field_value('recipe_serving');
		}
		$this->form_fields[] = (object)$serving_field;
				$this->form_fields[] = (object)array( 'type' => 'div', 'class' => '', 'is_closing' => true );
		
		
		// difficulty
				$this->form_fields[] = (object)array( 'type' => 'div', 'class' => 'third', 'is_closing' => false );
		$taxonomies = array( 'recipe_difficulty' );
		$args = array( 'hide_empty' => false, 'fields' => 'all' );
		$recipe_difficulties = get_terms($taxonomies, $args);
		$recipe_difficulties_str = ':' . __('Select language', 'socialchef') . ',';
		foreach ($recipe_difficulties as $recipe_difficulty) {
			$recipe_difficulties_str .= "{$recipe_difficulty->term_id}:{$recipe_difficulty->name},";
		}
						$recipe_difficulties_str = rtrim($recipe_difficulties_str, ',');
		$difficulty_field = array( 'type' => 'select', 'role' => 'internal', 'name' => 'recipe_difficulty', 'id' => 'fes_recipe_difficulty', 'description' => __( 'Select language', 'socialchef' ), 'values' => $recipe_difficulties_str, 'class' => 'select' );
		if ($this->entry != null) {
			$difficulty_field['value'] = $this->get_entry_field_value('recipe_difficulty');
		}
		$this->form_fields[] = (object)$difficulty_field;
				$this->form_fields[] = (object)array( 'type' => 'div', 'class' => '', 'is_closing' => true );
		
		// meal course
				$this->form_fields[] = (object)array( 'type' => 'div', 'class' => 'third', 'is_closing' => false );
		$taxonomies = array( 'recipe_meal_course' );
		$args = array( 'hide_empty' => false, 'fields' => 'all' );
		$recipe_meal_courses = get_terms($taxonomies, $args);
		$recipe_meal_courses_str = ':' . __('Select license', 'socialchef') . ',';
		foreach ($recipe_meal_courses as $recipe_meal_course) {
			$recipe_meal_courses_str .= "{$recipe_meal_course->term_id}:{$recipe_meal_course->name},";
		}
						$recipe_meal_courses_str = rtrim($recipe_meal_courses_str, ',');
		$meal_course_field = array( 'type' => 'select', 'role' => 'internal', 'name' => 'recipe_meal_course', 'id' => 'fes_recipe_meal_course', 'description' => __( 'Select license', 'socialchef' ), 'values' => $recipe_meal_courses_str, 'class' => 'select' );
		if ($this->entry != null) {
			$meal_course_field['value'] = $this->get_entry_field_value('recipe_meal_course');
		}
		$this->form_fields[] = (object)$meal_course_field;
				$this->form_fields[] = (object)array( 'type' => 'div', 'class' => '', 'is_closing' => true );
		
		$this->form_fields[] = (object)array( 'type' => 'div', 'class' => 'f-row', 'is_closing' => true );
		// end row
		// row
		// $this->form_fields[] = (object)array( 'type' => 'div', 'class' => 'f-row', 'is_closing' => false );
		// $taxonomies = array( 'recipe_category' );
		// $args = array( 'hide_empty' => false, 'fields' => 'all' );
		// $recipe_categories = get_terms($taxonomies, $args);
		// $recipe_categories_str = '';
		// foreach ($recipe_categories as $recipe_category) {
		// 	$recipe_categories_str .= "{$recipe_category->term_id}:{$recipe_category->name},";
		// }
		// $recipe_categories_str = rtrim($recipe_categories_str, ',');
		// $this->form_fields[] = (object)array( 'type' => 'checkbox', 'role' => 'internal', 'name' => 'recipe_categories', 'id' => 'fes_recipe_categories', 'description' => __( 'Story categories', 'socialchef' ), 'values' => $recipe_categories_str, 'class' => 'checkboxes' );
		// $this->form_fields[] = (object)array( 'type' => 'div', 'class' => 'f-row', 'is_closing' => true );
		// end row
		
		wp_reset_postdata();
	}
	
	function get_instruction_html($index, $value_array = array()) {
?>
<!-- <div class="f-row instruction instruction_<?php echo esc_attr( $index ); ?>">
	<div class="full">
		<?php
		$atts = array( 'description' => __('Enter instruction', 'socialchef'), 'class' => 'instruction_text', 'type' => 'text', 'name' => 'instruction_' . $index, 'id' => 'instruction_' . $index );
		if (count ($value_array) > 0) {
			$atts['value'] = esc_attr ( $value_array['instruction'] );
		}
		echo $this->_render_input($atts);
		?>
	</div>
	<button class="remove remove_instruction">-</button>
</div>
 --><?php
}
function get_ingredient_html($index, $value_array = array()) {
?>
<!-- <div class="f-row ingredient ingredient_<?php echo esc_attr( $index ); ?>">
	<div class="large">
		<?php
		$atts = array( 'description' => __('Ingredient', 'socialchef'), 'type' => 'text', 'name' => 'ingredient_' . $index . '_name', 'class' => 'ingredient_name', 'id' => 'fes_ingredient_' . $index . '_name' );
		if (count ($value_array) > 0) {
			$term = get_term_by('slug', $value_array['ingredient'], 'ingredient');
			if ($term)
				$atts['value'] = esc_attr ( $term->name );
		}
		echo $this->_render_input($atts);
		?>
	</div>
	<div class="small">
		<?php
		$atts = array( 'description' => __('Quantity', 'socialchef'), 'type' => 'text', 'name' => 'ingredient_' . $index . '_quantity', 'id' => 'fes_ingredient_' . $index . '_quantity', 'class' => 'ingredient_quantity' );
		if (count ($value_array) > 0) {
			$atts['value'] = esc_attr ( $value_array['amount'] );
		}
		echo $this->_render_input($atts);
		?>
	</div>
	<div class="third">
		<?php
		$taxonomies = array( 'ingredient_unit' );
		$args = array( 'hide_empty' => false, 'fields' => 'all' );
		$ingredient_units = get_terms($taxonomies, $args);
		$ingredient_units_str = ':' . __('Select ingredient unit', 'socialchef') . ',';
		foreach ($ingredient_units as $ingredient_unit) {
			$ingredient_units_str .= "{$ingredient_unit->term_id}:{$ingredient_unit->name},";
		}
						$ingredient_units_str = rtrim($ingredient_units_str, ',');
		$atts = array( 'type' => 'select', 'role' => 'internal', 'name' => 'ingredient_' . $index . '_unit', 'id' => 'fes_ingredient_' . $index . '_unit', 'description' => __( 'Select ingredient unit', 'socialchef' ), 'values' => $ingredient_units_str, 'class' => 'select ingredient_unit' );
		if (count ($value_array) > 0) {
			$term = get_term_by('slug', $value_array['ingredient_unit'], 'ingredient_unit');
			if ($term)
				$atts['value'] = $term->term_id;
		}
		echo $this->_render_select($atts);
		?>
	</div>
	<button class="remove remove_ingredient">-</button>
</div> -->
<?php
}
function get_nutritional_element_html($index, $value_array = array()) {
?>
<!-- <div class="f-row nutritional_element nutritional_element_<?php echo esc_attr( $index ); ?>">
	<div class="large">
		<?php
		$atts = array( 'description' => __('Nutritional element', 'socialchef'), 'type' => 'text', 'name' => 'nutritional_element_' . $index . '_name', 'class' => 'nutritional_element_name', 'id' => 'fes_nutritional_element_' . $index . '_name' );
		if (count ($value_array) > 0) {
			$term = get_term_by('slug', $value_array['nutritional_element'], 'nutritional_element');
			if ($term)
				$atts['value'] = esc_attr ( $term->name );
		}
		echo $this->_render_input($atts);
		?>
	</div>
	<div class="small">
		<?php
		$atts = array( 'description' => __('Quantity', 'socialchef'), 'type' => 'text', 'name' => 'nutritional_element_' . $index . '_quantity', 'id' => 'fes_nutritional_element_' . $index . '_quantity', 'class' => 'nutritional_element_quantity' );
		if (count ($value_array) > 0) {
			$atts['value'] = esc_attr ( $value_array['amount'] );
		}
		echo $this->_render_input($atts);
		?>
	</div>
	<div class="third">
		<?php
		$taxonomies = array( 'nutritional_unit' );
		$args = array( 'hide_empty' => false, 'fields' => 'all' );
		$nutritional_units = get_terms($taxonomies, $args);
		$nutritional_units_str = ':' . __('Select nutritional unit', 'socialchef') . ',';
		foreach ($nutritional_units as $nutritional_unit) {
			$nutritional_units_str .= "{$nutritional_unit->term_id}:{$nutritional_unit->name},";
		}
						$nutritional_units_str = rtrim($nutritional_units_str, ',');
		$atts = array( 'type' => 'select', 'role' => 'internal', 'name' => 'nutritional_' . $index . '_unit', 'id' => 'fes_nutritional_' . $index . '_unit', 'description' => __( 'Select nutritional unit', 'socialchef' ), 'values' => $nutritional_units_str, 'class' => 'select nutritional_unit' );
		if (count ($value_array) > 0) {
			$term = get_term_by('slug', $value_array['nutritional_unit'], 'nutritional_unit');
			if ($term)
				$atts['value'] = $term->term_id;
		}
		echo $this->_render_select($atts);
		?>
	</div>
	<button class="remove remove_nutritional_element">-</button>
</div>
 --><?php
}
/**
* Display the upload post form
*/
function upload_form( $content_type = 'recipe' ) {
	if ( $content_type == 'recipe' )
		$this->_initialize_recipe_fields();
		
	// Reset postdata in case it got polluted somewhere
	wp_reset_postdata();
	$form_post_id = get_the_id();
	$post_id = (int) $form_post_id;
	
	ob_start();
?>
<script type="text/javascript">
window.adminAjaxUrl = '<?php echo home_url() . "/wp-admin/admin-ajax.php"; ?>';
</script>
<form action="<?php echo esc_url ( admin_url( 'admin-ajax.php' ) ) ?>" method="post" id="fes-upload-form-<?php echo esc_attr( $content_type ); ?>" name="fes-upload-form-<?php echo esc_attr( $content_type ); ?>" class="fes-upload-form fes-form-<?php echo esc_attr( $content_type ); ?>" enctype="multipart/form-data">
	<div class="alert alert-danger" style="display:none">
		<?php _e('Errors were encountered when processing your submission. Please correct them and submit again.', 'socialchef') ?>
	</div>
	<input type="hidden" name="gameCanvasImage" id="gameCanvasImage"/>
	<input type="hidden" name="chimpleStoryJSON" id="chimpleStoryJSON"/>
	
	<?php
	if ( !empty( $_GET ) && isset($_GET['response'] ) && ($_GET['response'] == 'fes-sent' || $_GET['response'] == 'fes-recipe-sent' || $_GET['response'] == 'fes-recipe-updated') )
		$this->_display_response_notices( $_GET );
	else {
		$this->_display_response_notices( $_GET );
	?>
	<section>
		<script>
		window.enableNutritionalElements = <?php echo esc_js ( $this->sc_theme_globals->enable_nutritional_elements() ); ?>;
		window.ingredientQuantityText = '<?php echo esc_js ( __('Quantity', 'socialchef') ); ?>';
		window.ingredientNameText = '<?php echo esc_js ( __('Ingredient', 'socialchef') ); ?>';
		window.nutritionalElementQuantityText = '<?php echo esc_js ( __('Quantity', 'socialchef') ); ?>';
		window.nutritionalElementNameText = '<?php echo esc_js ( __('Nutritional element', 'socialchef') ); ?>';
		window.instructionText = '<?php echo esc_js ( __('Enter instruction', 'socialchef') ); ?>';
		</script>
		<h2><?php _e('Basics', 'socialchef'); ?></h2>
		<p><?php _e('All fields are required.', 'socialchef'); ?></p>
		<?php
		$atts = array( 'type' => 'hidden', 'role' => 'internal', 'name' => 'post_author', 'id' => 'fes_post_author', 'value' =>  $this->get_current_user_id() );
		echo $this->_render_input($atts);
		
		$atts = array( 'type' => 'hidden', 'role' => 'internal', 'name' => 'content_type', 'id' => 'fes_content_type', 'value' =>  $content_type );
		echo $this->_render_input($atts);
		
		if ($this->entry_id > 0) {
			$atts = array( 'type' => 'hidden', 'role' => 'internal', 'name' => 'entry_id', 'value' => $this->entry_id, 'id' => 'fes_entry_id' );
			echo $this->_render_input($atts);
		}
		
				$atts = array( 'type' => 'text', 'role' => 'title', 'name' => 'post_title',	'id' => 'fes_post_title', 'class' => '', 'description' =>  __( 'Title', 'socialchef' ) );
		echo '<div class="f-row">';
				echo $this->_render_input($atts);
		echo '</div>';
		$this->_render_extra_fields();
		?>
	</section>
	<div id="results" class="full">
		<canvas id="gameCanvas" width="640" height="450"></canvas>
		<canvas id="snapShotCanvas" style="display:none;" width="450" height="450"></canvas>		
	</div>	
	<p>
	<div style="display: none;">
		<?php
		$atts = array( 'type' => 'submit', 'role' => 'internal', 'name' => 'submitRecipe', 'id' => 'submit_recipe', 'class' => 'buttonhidden', 'value' =>  __( 'Save this story', 'socialchef' ) );		
 		echo $this->_render_input($atts);		
		if (isset($_GET['fesid'])) {
		$atts = array( 'type' => 'hidden', 'role' => 'internal', 'name' => 'fesid', 'id' => 'fesid', 'value' => wp_kses($_GET['fesid'], '')  );
		echo $this->_render_input($atts);
		}
		$atts = array( 'type' => 'hidden', 'role' => 'internal', 'name' => 'action', 'id' => 'fes_action', 'value' =>  'frontend_recipe_submit' );
		echo $this->_render_input($atts);
		wp_nonce_field( FES_NONCE, 'fes_nonce' );
		?>
		<input type="hidden" name="form_post_id" value="<?php echo (int) $form_post_id ?>" />
		<div class="recipe_saving" style="display:none"><img src="<?php echo SocialChef_Theme_Utils::get_file_uri( '/images/ico/ajax-loader.gif' ); ?>" alt="..." /></div>
	</div>
	<?php } ?>
	<div class="clear"></div>
</form>
<?php
		return ob_get_clean();
	}
	
	function _render_extra_fields() {
		
		foreach ($this->form_fields  as $form_field) {
			if ($form_field->type == 'select')
				echo $this->_render_select($form_field);
			elseif  ($form_field->type == 'checkbox' && isset($form_field->class) && $form_field->class == 'checkboxes')
				echo $this->_render_checkboxes($form_field);
			elseif  ($form_field->type == 'textarea')
				echo $this->_render_textarea($form_field);
			elseif  ($form_field->type == 'text' || $form_field->type == 'checkbox' || $form_field->type == 'file')
							echo $this->_render_input($form_field);
			elseif  ($form_field->type == 'div')
				echo $this->_render_div($form_field);
				
		}
	}
}
global $sc_frontend_submit;
$sc_frontend_submit = new Frontend_Submit();