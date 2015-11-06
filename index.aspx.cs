using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Configuration;
using System.Text;
using System.Web.Script.Serialization;
using System.Collections;

public partial class index : Page {

	public myFunctions myFunctionsInstance = new myFunctions();
	public constants varConst = new constants();
	public database varDbConn = new database();

	protected string myCookie = null;

	// int intSeperator = 0;
	
	protected string strH1;
	protected string metaKeywords;
	protected string metaDescription;
	protected string jsonShirts;
	public    string strImage;
	public    string strURL;
	public    string MetaKeywords;
	public    int    PageNum;
	public    int    NextPage;
	public    int    PreviousPage;

	public void Page_Load( object sender, EventArgs e ) {
		( ( DampTShirts )this.Master ).strImage = varConst.cDefaultShareIMG;
		strImage = varConst.cDefaultShareIMG;
		strURL = "http://www." + varConst.cSiteName + ".com/";
		
		//if ( Request.Cookies[varConst.cSiteName] != null ) {
			//myCookie = Server.HtmlEncode(Request.Cookies[varConst.cSiteName].Value);
			//Trace.Write("MY NEW COOKIE: " + myCookie);
		//}
		
		string Search    = myFunctionsInstance.unStrip( Request.QueryString[ "Search" ] ?? "0" );
		string TempTagID = Request.QueryString[ "TagID" ] ?? "0";
		int    TagID     = Convert.ToInt32( TempTagID );
		string Tag       = Request.QueryString[ "Tag" ] ?? "";
		string tempPage  = Request.QueryString[ "Page" ] ?? "1";
		PageNum          = Convert.ToInt32( tempPage );
		NextPage         = PageNum + 1;
		PreviousPage     = PageNum - 1;
		if( PreviousPage == 0 ) {
			PreviousPage = 1;
		}


		// START VARIABLES //

		if ( Search != "0" ) {

			strH1 = varConst.cH1Search + Search;
			this.Page.Title = varConst.cTitle;
			metaKeywords = Search + ", " + metaKeywords;
			metaDescription = "The best " + Search + " shirts from all over the internet. Vote for the best t-shirts on " + varConst.cSiteName + ".com";
		
		} else if ( TagID > 0 ) {

			string myTag = "";
			varDbConn.conn.Open();
			SqlCommand cmd = new SqlCommand();
			cmd.Connection = varDbConn.conn;
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.CommandText = "usp_Digg_GetTagDetail";
			cmd.Parameters.Add("@TagID", SqlDbType.Int);
			cmd.Parameters["@TagID"].Value = TagID;
			SqlDataReader rdrTag = cmd.ExecuteReader();

			if ( rdrTag.HasRows ) {
				while ( rdrTag.Read() ) {
					myTag = rdrTag["Tag"].ToString();
					metaKeywords = rdrTag["MetaKeywords"].ToString();
					strImage = rdrTag["Image"].ToString();
					strURL = strURL + "shirt/tag/" + TagID + "/" + myFunctionsInstance.Stripper(myTag).ToString() + "/";
				}
			}
			rdrTag.Close();
			varDbConn.conn.Close();

			strH1 = myTag;
			
			if ( TagID != 474 ) {
					strH1 = strH1 + varConst.cH1Tag;
			}
			this.Page.Title = myTag + varConst.cH1Tag;
			metaKeywords = myTag + " shirts, " + metaKeywords;
			metaDescription = "The best " + myTag + " shirts from all over the internet. Vote for the best t-shirts on " + varConst.cSiteName + ".com";
		
		} else {

			strH1 = varConst.cH1Default;
			this.Page.Title = varConst.cTitle;
			metaKeywords = varConst.keywords();
			metaDescription = varConst.cDescription;
		}

		Trace.Write("Page is: " + Page);
		Trace.Write("TagID is: " + TagID);
		Trace.Write("Tag is: " + Tag);
		Trace.Write("Search is: " + Search);

		using ( varDbConn.conn )
		{                                                                    
			varDbConn.conn.Open();
			SqlCommand cmd = new SqlCommand();
			cmd.Connection = varDbConn.conn;
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.CommandText = "usp_Damp_Products";
			cmd.Parameters.Add("@TagID", SqlDbType.Int);
			cmd.Parameters["@TagID"].Value = TagID;
			cmd.Parameters.Add("@Search", SqlDbType.VarChar, 50);
			cmd.Parameters["@Search"].Value = Search;
			cmd.Parameters.Add("@SiteName", SqlDbType.VarChar, 50);
			cmd.Parameters["@SiteName"].Value = varConst.cSiteName;
			cmd.Parameters.Add("@Page", SqlDbType.Int);
			cmd.Parameters["@Page"].Value = PageNum;
			cmd.Parameters.Add("@PageSize", SqlDbType.Int);
			cmd.Parameters["@PageSize"].Value = varConst.perPage;
			cmd.Parameters.Add("@OrderBy", SqlDbType.VarChar, 50);
			cmd.Parameters["@OrderBy"].Value = "thumbs";

			using ( SqlDataReader Products = cmd.ExecuteReader() ) {
				ProductList.DataSource = Products;
				ProductList.DataBind();
			}

			//JavaScriptSerializer serializer = new JavaScriptSerializer();
			//ArrayList arrShirts = new ArrayList();

			// while ( drShirts.Read() )
			// {
			// 	object[] values = new object[ drShirts.FieldCount ];
			//	drShirts.GetValues( values );
			//	arrShirts.Add( values );
			//}
			//jsonShirts = serializer.Serialize( arrShirts );
			//Trace.Write("JSON: " + jsonShirts);
		}
	}

	//void LinkButton_Click( Object sender, EventArgs e )  {
		//h1.Text="You clicked the link button";
	//}

	//public void Load_More() {

	//}

	//BUILD THE SHIRT'S TAG LIST
	public void Products_ItemDataBound( object sender, RepeaterItemEventArgs e ) {

		if ( e.Item.ItemType == ListItemType.Item || e.Item.ItemType == ListItemType.AlternatingItem )
		{
			DbDataRecord dbrd = ( DbDataRecord )e.Item.DataItem;
			var ProductList = e.Item.FindControl( "Products" ) as Literal;

			string title = myFunctionsInstance.Stripper(dbrd[ "title" ].ToString());
			int dampId = Convert.ToInt32(dbrd[ "dampId" ]);
			
			ProductList.Text = "<div>" + title + "</div>";
		}
	}
}