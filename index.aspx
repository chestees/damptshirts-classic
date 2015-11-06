<%@ Page Language="C#" MasterPageFile="~/DampTShirts.master" CodeFile="index.aspx.cs" Inherits="index" %>
<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">
	<meta name="keywords" content="<%= metaKeywords %>" />
	<meta name="description" content="<%= metaDescription %>" />
	<link rel="image_src" href="<%= strImage %>" />
	<meta property="og:title" content="<%= strH1 %>" />
	<meta property="og:description" content="<%= metaDescription %>" />
	<meta property="og:type" content="product" />
	<meta property="og:site_name" content="<%= varConst.cFriendlySiteName %>" />
	<meta property="fb:app_id" content="<%= varConst.cFBAppID %>"/>
	<meta property="og:url" content="<%= strURL %>" />
	<meta property="og:image" content="<%= strImage %>" />
	<script>
		var siteVars = {};
		var myCookie = null;
		var cSiteName = "<%= varConst.cSiteName %>";
		var cSEODirectory = "<%= varConst.cSEODirectory%>";
		var cDividerAd1 = "<%= varConst.cDividerAd1 %>";
		var cDividerAd2 = "<%= varConst.cDividerAd2 %>";
		var cDividerAd3 = "<%= varConst.cDividerAd3 %>";
		var showThumbs = ( ( "<%= varConst.showThumbs %>" ).toLowerCase() === "true" );
		var perPage = <%= varConst.perPage %>;
		var perRow = <%= varConst.perRow %>;

		// siteVars.json = <%= jsonShirts %>;
		// siteVars.myCookie = myCookie;
		
		siteVars.constants = {};
		siteVars.constants.seoDirectory = cSEODirectory;
		siteVars.constants.cDividerAd1  = cDividerAd1;
		siteVars.constants.cDividerAd2  = cDividerAd2;
		siteVars.constants.cDividerAd3  = cDividerAd3;
		siteVars.showThumbs             = showThumbs;
		siteVars.constants.perPage      = perPage;
		siteVars.constants.perRow       = perRow;
	</script>
	<script src="<%= ResolveUrl( "~/js/main.js" ) %>" />
</asp:Content>
<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
	<!-- START MAIN AREA -->
	<main class="container-fluid">
		<div class="row">
			<aside class="col-md-2">
				<%if(varConst.cRightColBanner_1 != "") { %>
				<div class="module_1 b_margin_10">
					<%= varConst.cRightColBanner_1 %>
				</div>
				<%} %>
				<div class="module_1 ad"> 
					<a target="_blank" href="http://www.shareasale.com/r.cfm?b=202882&amp;u=323844&amp;m=5108&amp;urllink=www.bustedtees.com&amp;afftrack=DampBanner"><img src="http://www.shareasale.com/image/5108/160natasha.jpg" alt="BustedTees - But 2, Get 1 Free" border="0" /></a>
				</div>
			</aside>
		
			<article class="col-md-10">
				<div class="product-list-container">	
					<h1><%= strH1 %></h1>  
					<div class="sort module_1 b_margin_10 clearfix" id="sortOptions">
						<a class="btn btn_blue floatleft" href="/tag-list/">Browse by Tag</a>
						<span class="btn btn_blue floatright l_margin_5 sortON" id="btnMostRecent">Most Recent</span>
						<span class="btn btn_blue floatright l_margin_5" id="btnLeast">Least Liked</span>
						<span class="btn btn_blue floatright l_margin_5" id="btnMost">Most Liked</span>
						<div class="clear"></div>
					</div>
					<form id="form1" runat="server">
						<asp:Repeater id="ProductList" runat="server">
							<HeaderTemplate>
								<div class="product-list">
							</HeaderTemplate>
							<ItemTemplate>
								<div class="product <%# DataBinder.Eval( Container.DataItem, "dampId" ) %>">
									<a class="product-link thumbnail" 
										href="/t/shirt/<%# DataBinder.Eval( Container.DataItem, "dampId" ) %>/<%# DataBinder.Eval( Container.DataItem, "slug" ) %>"
										style="background: url('<%# DataBinder.Eval( Container.DataItem, "image" ) %>') center">
										<!-- <img class="product-image" alt="<%# DataBinder.Eval( Container.DataItem, "title" ) %>" title="<%# DataBinder.Eval( Container.DataItem, "title" ) %>" src=""> -->
									</a>
									<!-- if( myCookie != null ) DidTheyVote( intThumbs, myCookie ) || showThumbs == 'True') { -->
									<div class="thumbs" data-id="<%# DataBinder.Eval( Container.DataItem, "dampId" ) %>">
										<span class="badge vote-count"><%# DataBinder.Eval( Container.DataItem, "thumbs" ) %> votes</span>
										<div class="thumbs-info">
											<div class="btn btn-danger vote-down">
												<span class="txt">Meh</span>
											</div>
											<div class="btn btn-primary l_margin_5 vote-up">
												<span class="txt">Like</span>
											</div>
											<div class="date-added"><%# DataBinder.Eval( Container.DataItem, "dateAdded" ) %></div>
										</div>
									</div>
								</div>
							</ItemTemplate>
							<FooterTemplate>
								<div>
							</FooterTemplate>
						</asp:Repeater>
						<div class="paging">
							<a class="btn btn-default" href="/p/<%= PreviousPage %>/0/0">
								<span class="glyphicon glyphicon-menu-left" aria-hidden="true"></span>
							</a>
							<a class="btn btn-default" href="/p/<%= NextPage %>/0/0">
								<span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span>
							</a>
						</div>
					</form>
				</div>
			</article>
		</div>
	</main>
</asp:Content>