<?php
/**
 * @file
 * Contains \Drupal\contactus\Plugin\Block\XaiBlock.
 */

namespace Drupal\breadcrumb\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'breadcrumb' block.
 *
 * @Block(
 *   id = "breadcrumb_block",
 *   admin_label = @Translation("Breadcrumb block"),
 *   category = @Translation("Custom breadcrumb block example")
 * )
 */
class BreadcrumbBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
  $main_menu_tree = \Drupal::menuTree();
    $main_menu_name = 'main';
    $main_parameters = $main_menu_tree->getCurrentRouteMenuTreeParameters($main_menu_name);
    $menus = $main_menu_tree->load($main_menu_name, $main_parameters);
	
	$menuarray = get_object_vars($main_parameters);
	$activetrial = $menuarray['activeTrail'];
	
	$menucount = count($activetrial);
	$activereverse = array_reverse($activetrial);
	
	$breadcrumb = '<div class="custombreadcrumb">';
	
	foreach($activereverse as $activeval){
		if($activeval != ''){
		$menuUUIDArray = explode(':', $activeval);
		$uuid = $menuUUIDArray[1];
		$menu_content = current(\Drupal::entityManager()->getStorage('menu_link_content')->loadByProperties(array('uuid' => $uuid)));
		$menutitle = $menu_content->get('title')->value;
		if($menutitle != 'NoLink'){
			if(end($activereverse) == $activeval){
				$breadcrumb .= $menutitle;
			}else{
				$breadcrumb .= $menutitle . ' » ';
			}
		}
		}
	}
	
	$breadcrumb .= '</div>';

echo $breadcrumb;

  }
  
  /**
     * {@inheritdoc}
     */
    public function getCacheMaxAge() {
        return 0;
    }
  
}
