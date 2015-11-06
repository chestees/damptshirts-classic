require( [ 
		'jquery'
		, 'velocity'
		, 'underscore'
		, 'handlebars'
		, 'moment'
	], function ( 
		$
		, velocity
		, _
		, Handlebars
		, Moment
	) {

	// Use UI.registerHelper..
	Handlebars.registerHelper( "formatDate", function( datetime, format ) {
		if ( moment ) {
			if( format === 'fromNow' ) {
				return moment( datetime ).fromNow();
			} else {
				return moment( datetime ).format( format );
			}
		}
		else {
			return datetime;
		}
	});
	
	var index = 0;
	var rows = 0;
	var mycounter = 0;
	var currentLoaded = 0;
	// var json = $( siteVars.json ).sort( mostRecent );
	// var products = [];
	var loadingImgHTML = '';
	var SEODirectory   = siteVars.constants.seoDirectory;
	var myCookie       = siteVars.myCookie;
	var modWidth       = $( 'article' ).outerWidth();
	var perRow         = siteVars.constants.perRow;
	var perPage        = siteVars.constants.perPage;

	this.maxWidth      = ( $( 'article' ).width() ) / perRow;

	// $.bridget( 'masonry', Masonry );
	// $( '.grid' ).masonry( {
	// 	itemSelector: '.product',
	// 	columnWidth: 200
	// } );

	// jsonLength = json.length;

	// Format the product object
	// _.each( json, function( product ) {

	// 	var myProduct = {};
	// 	myProduct.dampId = product[1];
	// 	myProduct.image = product[2];
	// 	myProduct.imageLg = product[3];
	// 	myProduct.link = product[4];
	// 	myProduct.thumbs = product[5];
	// 	myProduct.title = product[6];
	// 	myProduct.vendorId = product[7];
	// 	myProduct.dateAdded = product[8];
	// 	myProduct.slug = product[9];

	// 	products.push( myProduct );

	// } );

	// ResizeImages();

	// PlaceAds();

	// $( '.product' ).on( 'mouseenter', _.bind( function ( $evt ) {
	// 	this.showRollover = setTimeout( _.bind( this.productRollover, this, $evt ), 300 );
	// }, this ) );

	// $( '.product' ).on( 'mouseleave', _.bind( function ( $evt ) {
	// 	clearTimeout( this.showRollover );
	// 	this.thumbs.css( 'display', 'none' );
	// }, this ) );

	this.productRollover = function( $evt ) {

		var padding = 20;
		var product = $ ( $evt.currentTarget );
		var image = product.find( '.product-image' );

		this.thumbs = product.find( '.thumbs' );
		var thumbsInfo = product.find( '.thumbs-info' );
		var infoWidth;
		var rolloverWidth = product.outerWidth( true ) + padding * 2;

		// Get the thumbs buttons height
		var infoHeight = product.find( '.thumbs-info' ).clone().appendTo( product ).css( {
			'position': 'absolute'
			, 'left': -1000
		} ).attr( 'class', 'destroyMe' ).outerHeight();

		infoWidth = $( '.destroyMe' ).outerWidth();
		$( '.destroyMe' ).remove()
		
		this.thumbs.height( image.height() + infoHeight + 40 );
		
		this.thumbs.velocity( 'fadeIn', { 
			duration: 100
		}).css({
			'width': rolloverWidth
			, 'top': -1 * padding
			, 'left': -1 * padding
		});
		
		thumbsInfo.css({
			'left': ( rolloverWidth - infoWidth ) / 2
		});
	}

	function DidTheyVote( DiggID, myCookie ) {
		var Voted = 0;
		if (myCookie != null) {
			Voted = myCookie.indexOf("X" + DiggID + "X", 0);
		}
		if(Voted >= 0) {
			return true;
		} else {
			return false;
		}
	}

	function isPositive_Class( Thumbs ) {
		if ( Thumbs > 0 ) {
			return (" Positive");
		}
		else if ( Thumbs < 0 ) {
			return (" Negative");
		}
		else {
			return ("");
		}
	}

	  function isPositive_Number( Thumbs ) {
		if ( Thumbs > 0 ) {
			return ("+" + Thumbs);
		}
		else {
			return (Thumbs);
		}
	}

	function PlaceAds() {
		var $product = $( '.product' );

			$( $product[ 4 * perRow ] ).after( '<div class="ad_content">' + siteVars.constants.cDividerAd1 + '</div>' );

			$( $product[ 8 * perRow ] ).after( '<div class="ad_content">' + siteVars.constants.cDividerAd2 + '</div>' );

			$( $product[ 12 * perRow ] ).after( '<div class="ad_content">' + siteVars.constants.cDividerAd3 + '</div>' );

		index++;
	}

	function ResizeImages() {
		
		$( '.product-image' ).css( 'width', this.maxWidth );
	}

	// $('.btn.more').live("click", function () {
	// 	$(this).remove();
	// 	MoreShirts();
	// });

	// $('.Product').live("mouseover", function () {
	// 	if (!$(this).data('init')) {
	// 		$(this).data('init', true);
	// 		$(this).hoverIntent(function () {
	// 			$('.ThumbMod', $(this)).fadeIn();
	// 		}, function () {
	// 			$('.ThumbMod', $(this)).fadeOut();
	// 		});
	// 		$(this).trigger('mouseover');
	// 	}
	// });

	//      $(window).scroll(function() {
	//        $(window).height();   // returns height of browser viewport
	//        $(document).height(); // returns height of HTML document
	//		    if ($(window).scrollTop() >= $(document).height() - $(window).height() - ($(window).height()/4)) {
	//          MoreShirts();
	//					alert("Doc Height: " + $(document).height() + "\n 75% window height: " + ($(window).height()*.75) + "\n window height: " + ($(window).height()));
	//		    }
	//	    });
	
	function mostRecent( a, b ) { // DEFAULT
		return a[0] > b[0] ? -1 : 1;
	};
	function thumbsDESC( a, b ) { 
		return a[3] > b[3] ? -1 : 1;
	};
	function thumbsASC( a, b ) {
		return a[3] > b[3] ? 1 : -1;
	};

	//SORT OPTIONS
	$('#btnMostRecent').click( function() {
		$(".Product").remove();
		$(".ad_content").remove();
				$('.btn.more').remove();
		index = 0; rows = 0;
		products = json.sort(mostRecent);
		MoreShirts();
		$('#sortOptions').children().removeClass('sortON');
		$(this).addClass("sortON");
	});
	$('#btnMost').click( function() {
		$(".Product").remove();
		$(".ad_content").remove();
				$('.btn.more').remove();
		index = 0; rows = 0;
		products = json.sort(thumbsDESC);
		MoreShirts();
		$('#sortOptions').children().removeClass('sortON');
		$(this).addClass("sortON");
	});
	$('#btnLeast').click( function() {
		$(".Product").remove();
		$(".ad_content").remove();
				$('.btn.more').remove();
		index = 0; rows = 0;
		products = json.sort(thumbsASC);
		MoreShirts();
		$('#sortOptions').children().removeClass('sortON');
		$(this).addClass("sortON");
	});
} );