<?php
/**
 * @file
 * Contains \Drupal\contactus\Plugin\Block\XaiBlock.
 */

namespace Drupal\sidebarmenu\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'sidebarmenu' block.
 *
 * @Block(
 *   id = "sidebarmenu_block",
 *   admin_label = @Translation("SidebarMenu block"),
 *   category = @Translation("Custom sidebarmenu block example")
 * )
 */
class SidebarMenuBlock extends BlockBase {

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
	
	$countoffirst = $menucount-2;
	$countofsecond = $menucount-3;
	$countofthird = $menucount-4;
	
	$firstchildmenuitem = array_keys($activetrial)[$countoffirst];
	$secondchildmenuitem = array_keys($activetrial)[$countofsecond];
	$thirdchildmenuitem = array_keys($activetrial)[$countofthird];
	$activechild = array_keys($activetrial)[0];
	
	$menucontent = '';

$menuItems = [];
	foreach ($menus as $key => $value) {
	
	if($key == $firstchildmenuitem){

	if($key != 'standard.front_page'){
		$menuUUIDArray = explode(':', $key);
		$uuid = $menuUUIDArray[1];
	}else{
		$uuid = 'd643827b-2318-48e9-8ee9-ec6a892c356d';
	}
  
  $menu_content = current(\Drupal::entityManager()->getStorage('menu_link_content')->loadByProperties(array('uuid' => $uuid)));
  
  $url = $menu_content->getUrlObject();
  
  $menuItem['title'] = $menu_content->get('title')->value;
  
  $menuItem['link'] = ($url->toString() == '') ? '#' : $url->toString();
  
  $menuItem['weight'] = $menu_content->get('weight')->value;
  
  if ($value->hasChildren) {
	  
    $subTreeArray1 = $value->subtree;
	$menucontent .= '<ul class="sidemenufirst">';
    foreach ($subTreeArray1 as $keychild1 => $valchild1) {
		if($keychild1 == $secondchildmenuitem){
		if($keychild1 == $activechild){$liclass='liactive';}else{$liclass='notactive';}
		$childmenuUUIDArray1 = explode(':', $keychild1);
		$childuuid1 = $childmenuUUIDArray1[1];
		$childmenu_content1 = current(\Drupal::entityManager()->getStorage('menu_link_content')->loadByProperties(array('uuid' => $childuuid1)));
		$menucontent .= '<li><a class="'.$liclass.'" href="'.$childmenu_content1->getUrlObject()->toString().'">' . $childmenu_content1->get('title')->value . '</a>';
		
		if ($valchild1->hasChildren) {
			$subTreeArray2 = $valchild1->subtree;
			$menucontent .= '<ul class="sidesecondmenu">';
			foreach ($subTreeArray2 as $keychild2 => $valchild2) {
				if($keychild2 == $thirdchildmenuitem){
				if($keychild2 == $activechild){$liclass='liactive';}else{$liclass='notactive';}
				$childmenuUUIDArray2 = explode(':', $keychild2);
				$childuuid2 = $childmenuUUIDArray2[1];
				$childmenu_content2 = current(\Drupal::entityManager()->getStorage('menu_link_content')->loadByProperties(array('uuid' => $childuuid2)));
				$menucontent .= '<li><a class="'.$liclass.'" href="'.$childmenu_content2->getUrlObject()->toString().'">' . $childmenu_content2->get('title')->value . '</a>';
				
					if ($valchild2->hasChildren) {
					$subTreeArray3 = $valchild2->subtree;
					$menucontent .= '<ul class="sidethirdmenu">';
					foreach ($subTreeArray3 as $keychild3 => $valchild3) {
						if($keychild3 == $activechild){$liclass='liactive';}else{$liclass='notactive';}
						$childmenuUUIDArray3 = explode(':', $keychild3);
						$childuuid3 = $childmenuUUIDArray3[1];
						$childmenu_content3 = current(\Drupal::entityManager()->getStorage('menu_link_content')->loadByProperties(array('uuid' => $childuuid3)));
						$menucontent .= '<li><a class="'.$liclass.'" href="'.$childmenu_content3->getUrlObject()->toString().'">' . $childmenu_content3->get('title')->value . '</a>';
						
						if ($valchild3->hasChildren) {
							$subTreeArray4 = $valchild3->subtree;
							$menucontent .= '<ul class="sidefourthmenu">';
							foreach ($subTreeArray4 as $keychild4 => $valchild4) {
								if($keychild4 == $activechild){$liclass='liactive';}else{$liclass='notactive';}
								$childmenuUUIDArray4 = explode(':', $keychild4);
								$childuuid4 = $childmenuUUIDArray4[1];
								$childmenu_content4 = current(\Drupal::entityManager()->getStorage('menu_link_content')->loadByProperties(array('uuid' => $childuuid4)));
								$menucontent .= '<li><a class="'.$liclass.'" href="'.$childmenu_content4->getUrlObject()->toString().'">' . $childmenu_content4->get('title')->value . '</a>';
								
								if ($valchild4->hasChildren) {
									$subTreeArray5 = $valchild4->subtree;
									$menucontent .= '<ul class="sidefifthmenu">';
									foreach ($subTreeArray5 as $keychild5 => $valchild5) {
										if($keychild5 == $activechild){$liclass='liactive';}else{$liclass='notactive';}
										$childmenuUUIDArray5 = explode(':', $keychild5);
										$childuuid5 = $childmenuUUIDArray5[1];
										$childmenu_content5 = current(\Drupal::entityManager()->getStorage('menu_link_content')->loadByProperties(array('uuid' => $childuuid5)));
										$menucontent .= '<li><a class="'.$liclass.'" href="'.$childmenu_content5->getUrlObject()->toString().'">' . $childmenu_content5->get('title')->value . '</a></li>';
		
									}
									$menucontent .= '</ul>';
								}
								$menucontent .= '</li>';
							}
							$menucontent .= '</ul>';
						}
						$menucontent .= '</li>';
					}
					$menucontent .= '</ul>';
				}
				$menucontent .= '</li>';
				}
			}
			$menucontent .= '</ul>';
		}
		$menucontent .= '</li>';
		}
    }
	$menucontent .= '</ul>';
  }
}
}

echo $menucontent;

  }
  
  /**
     * {@inheritdoc}
     */
    public function getCacheMaxAge() {
        return 0;
    }
  
}
