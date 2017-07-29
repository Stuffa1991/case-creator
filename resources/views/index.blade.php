<!DOCTYPE html>
<html>
<head>
	<title> </title>
	<link rel="stylesheet" type="text/css" href="{{ asset('/css/app.css') }}">
</head>
<body>
	<div id="app">
		<nav class="navbar navbar-default">
			<div class="container">
				<!-- Brand and toggle get grouped for better mobile display -->
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="#">Brand</a>
				</div>
				<!-- Collect the nav links, forms, and other content for toggling -->
				<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul class="nav navbar-nav">
						<li>
							<router-link to="/" class=" ">Home</router-link>
						</li>
						@if (Auth::guest())
						<li>
							<a href="{{ route('login') }}" class="">Login</a>
						</li>
						@else
						<li>
							<router-link to="/create" class="">Create Case</router-link>
						</li>
					</ul>
					<ul class="nav navbar-nav navbar-right">
						<li>
							<a href="#"><span id="userBalance">{{ round(Auth::user()->balance,2) }}</span>$</a>
						</li>
						<li class="dropdown">
						  <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{ Auth::user()->username }} <span class="caret"></span></a>
						  <ul class="dropdown-menu">
						    <li>
						    	<router-link to="/myaccount" class="">My Account</router-link>
						    </li>
						    <li role="separator" class="divider"></li>
						    <li>
						    	<a href="{{ route('logout') }}" class="">Logout</a>
					    	</li>
						  </ul>
						</li>
					</ul>
					@endif
				</div><!-- /.navbar-collapse -->
			</div><!-- /.container -->
		</nav>
		<div class="container">
			<router-view class="view"></router-view>
		</div>
	</div>
	<script src="{{ asset('js/app.js') }}"></script>
</body>
</html>