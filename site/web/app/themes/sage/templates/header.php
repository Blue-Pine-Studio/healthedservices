<header class="banner">
  <div class="container">
    <nav class="navbar navbar-inverse navbar-fixed-top navbar-right">
      <a class="brand" href="<?= esc_url(home_url('/')); ?>">
        <?php bloginfo('name'); ?>
      </a>
      <?php
      if (has_nav_menu('primary_navigation')) :
        wp_nav_menu(['theme_location' => 'primary_navigation', 'menu_class' => 'nav navbar-right']);
      endif;
      ?>
    </nav>
  </div>
</header>
